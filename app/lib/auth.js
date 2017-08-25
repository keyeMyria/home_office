// @flow
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import EventEmitter from 'react-native-eventemitter';
import axios from 'axios';

import navigator from './navigator';
import httpClient from './HttpClient';
import logger from './logger';
import CONFIG from './../../config';

export type Role = 'ALUNO' | 'RESPONSAVEL' | 'PROFESSOR' | 'DIRETOR';

export type DecodedToken = {
    sub: string, // Email do aluno
    audience: string,
    telefoneFixo: ?string,
    role: Role,
    endpointArn: ?string, // ARN do usuário no SNS
    created: number, // Timestamp criação do token
    iss: string, // Quem emitiu o token
    imagem: ?string, // Avatar do usuário
    celular: string, // Celular do usuário
    nome: string, // Nome do usuário
    id: number, // ID do usuário
    exp: number, // Timestamp da expiração do token
};

class AppAuth {
    token: ?string;
    decodeToken: ?DecodedToken;
    userUrl: string = 'usuarios/search/findByJwtToken';

    constructor() {
        this.loadToken();
    }

    /**
     * Returns the url used to autenticate users
     */
    get authUrl(): string {
        return CONFIG.API.AUTH_URL;
    }

    /**
     * Returns `true` when the token is expired
     */
    get isTokenExpired(): boolean {
        if (this.decodeToken) {
            const expTime = this.decodeToken.exp * 1000;
            return Date.now() > expTime;
        }
        throw new Error('TOKEN não definido');
    }

    /**
     * Sets the token and decoded token value;
     */
    setToken(token: string): void {
        try {
            this.token = token;
            this.decodeToken = jwtDecode(token);
            this.persistToken(token);
            httpClient.setToken(token);
        } catch (error) {
            logger.error(error);
            throw new Error('TOKEN inválido');
        }
    }

    /**
     * Saves the token in AsyncStorage
     */
    async persistToken() {
        return AsyncStorage.setItem(CONFIG.ASYNC_STORE.TOKEN, this.token);
    }

    /**
     * Removes the token from async storage
     */
    async removePersitedToken() {
        return AsyncStorage.removeItem(CONFIG.ASYNC_STORE.TOKEN, this.token);
    }

    /**
     * Restores token AsyncStorage
     */
    async loadToken() {
        const token = await AsyncStorage.getItem(CONFIG.ASYNC_STORE.TOKEN);
        if (token) {
            this.setToken(token);
            if (this.decodeToken) {
                EventEmitter.emit('auth.user_loaded', {
                    token: this.token,
                    payload: this.decodeToken,
                    userID: this.decodeToken.id,
                });
                this.emitAuthenticated();
            }
            this.reloadEndpointARN();
        }
        EventEmitter.emit('auth.user_loaded', {
            token: null,
            payload: null,
            userID: null,
        });
    }

    /**
     * Emite um evento quando um erro acontece no login
     */
    emitLoginError(error: any, loginType: string = 'PASSWORD') {
        const code = (error.response && error.response.code) || 0;
        let message = (error.response && error.response.data.message) || error.message;
        if (error.response && error.response.code === 401) {
            message = 'O usuário ou senha informada são inválidos';
        }
        if (!message) {
            message = 'Aconteceu um erro no login. Contate o suporte';
        }
        EventEmitter.emit('auth.login_error', {
            code,
            message,
            loginType,
        });
    }

    emitLoginSuccess() {
        if (this.token && this.decodeToken) {
            EventEmitter.emit('auth.login_success', {
                token: this.token,
                payload: this.decodeToken,
                userID: this.decodeToken.id,
            });
        }
        this.emitAuthenticated();
    }

    emitAuthenticated() {
        if (this.token && this.decodeToken) {
            EventEmitter.emit('auth.authenticated', {
                token: this.token,
                payload: this.decodeToken,
                userID: this.decodeToken.id,
                userRole: this.decodeToken.role,
            });
        }
    }

    /**
     * Logs the user in the app, using a username and password
     */
    async login(username: string, password: string) {
        try {
            const response = await axios.post(this.authUrl, { username, password });
            const token = response.data && response.data.token;
            logger.log(`[AUTH] JWT-TOKEN (PASSWORD): "${token}"`);
            if (!token) {
                this.emitLoginError({ message: 'API não retornou um token' });
                return null;
            }
            this.setToken(token);
            const payload = this.decodeToken;
            const userID = this.decodeToken && this.decodeToken.id;
            this.emitLoginSuccess();
            return { token, payload, userID };
        } catch (error) {
            this.emitLoginError(error);
            logger.error(JSON.stringify(error, null, 2));
            return null;
        }
    }

    async loginFacebook(token: string) {
        logger.log(`[AUTH] JWT-TOKEN (FACEBOOK): "${token}"`);
        if (!token) {
            this.emitLoginError({ message: 'API não retornou um token' }, 'FACEBOOK');
            return null;
        }
        this.setToken(token);
        const payload = this.decodeToken;
        const userID = this.decodeToken && this.decodeToken.id;
        this.emitLoginSuccess();
        return { token, payload, userID };
    }

    async reloadEndpointARN() {
        if (!this.decodeToken) return;
        try {
            const { data } = await httpClient.get(`usuarios/${this.decodeToken.id}`);
            if (data) {
                EventEmitter.emit('auth.reload_endpoint_arn', { endpointArn: data.endpointArn });
            }
        } catch (error) {
            logger.warn('[AUTH] RELOAD ARN ERROR', error);
        }
    }

    async logout() {
        AsyncStorage.clear();
        navigator.reset('SplashScreen');
        try {
            const id = this.decodeToken && this.decodeToken.id;
            if (id) {
                await httpClient.patch(`usuarios/${id}`, { endpointArn: null });
            }
            EventEmitter.emit('auth.logout', { oldToken: this.token });
        } catch (error) {
            logger.warn('[AUTH] LOGOUT ERROR', error);
            logger.warn('Não foi possivél remover o arn do usuário');
        }
        httpClient.clearToken();
    }
}

const appAuth = new AppAuth();
export default appAuth;
