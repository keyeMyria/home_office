// @flow
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import EventEmitter from 'react-native-eventemitter';
import axios from 'axios';
import codePush from 'react-native-code-push';

// import navigator from './navigator';
import httpClient from './HttpClient';
import facebookLogin from './facebookLogin';
import logger from './logger';
import CONFIG from './../../config';

export type Role = 'ALUNO' | 'RESPONSAVEL' | 'PROFESSOR' | 'DIRETOR';

const SUPPORTED_ROLES = ['ALUNO', 'RESPONSAVEL', 'PROFESSOR', 'DIRETOR'];

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
    sobrenome: string,
    id: number, // ID do usuário
    exp: number, // Timestamp da expiração do token
};

class AppAuth {
    token: ?string;
    decodeToken: ?DecodedToken;
    facebookToken: ?string;
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

    get createUserUrl(): string {
        return `${CONFIG.API.BASE_URL}usuarios/registrar/`;
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
                this.emitAuthenticated();
                EventEmitter.emit('auth.user_loaded', {
                    token: this.token,
                    payload: this.decodeToken,
                    // $FlowFixMe
                    userID: this.decodeToken.id,
                });
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
        if (error.response && error.response.status === 401) {
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
        this.emitAuthenticated();
        if (this.token && this.decodeToken) {
            EventEmitter.emit('auth.login_success', {
                token: this.token,
                payload: this.decodeToken,
                userID: this.decodeToken.id,
            });
        }
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

    emitCreateUserError(error: any, code?: number) {
        const erros = {
            404: {
                message:
                    '[CNU-004] Não foi possível encontrar o seu telefone na base de dados. Entre em contato com a escola para que ela corrija seus dados cadastrados',
            },
            409: {
                message: '[CNU-005] Senha já cadastrada',
            },
            400: {
                message: '[CNU-006] Ocorreu um erro ao tentar criar o usuário',
            },
            HTTP: {
                message: '[CNU-003] Ocorreu um erro ao tentar criar o usuário',
            },
        };

        if (error.response) {
            const message = (erros[error.response.status] || erros.HTTP).message;
            const status = error.response;
            EventEmitter.emit('auth.create_user_error', { message, status });
        } else {
            const message = `[${code || 'CNU-000'}] Ocorreu um erro ao tentar criar o usuário`;
            EventEmitter.emit('auth.create_user_error', { message, status: 0 });
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
            const decodeToken: DecodedToken = jwtDecode(token);
            if (SUPPORTED_ROLES.indexOf(decodeToken.role) === -1) {
                this.emitLoginError({ message: 'Tipo de usuário não suportado' });
                return null;
            }
            this.setToken(token);
            const payload = this.decodeToken;
            const userID = this.decodeToken && this.decodeToken.id;
            this.emitLoginSuccess();
            return { token, payload, userID };
        } catch (error) {
            this.emitLoginError(error);
            logger.warn(JSON.stringify(error, null, 2));
            return null;
        }
    }

    loginToken(token: string) {
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

    async loginFacebook(celular: ?string) {
        if (!this.facebookToken) {
            this.facebookToken = await facebookLogin.login();
        }
        if (!this.facebookToken) {
            EventEmitter.emit('auth.facebook_login_error', { type: 'TOKEN' });
            return;
        }
        if (celular) {
            const token = await facebookLogin.sendTokenToServer(this.facebookToken, celular);
            if (!token) {
                EventEmitter.emit('auth.facebook_login_error', { type: 'CELULAR_NOT_FOUND' });
                return;
            }
            this.loginToken(token);
        } else {
            const token = await facebookLogin.sendTokenToServer(this.facebookToken);
            if (!token) {
                EventEmitter.emit('auth.facebook_login_error', { type: 'EMAIL_NOT_FOUND' });
                return;
            }
            this.loginToken(token);
        }
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
        await AsyncStorage.clear();
        await facebookLogin.logout();
        // navigator.reset('SplashScreen');
        httpClient.clearToken();
        codePush.restartApp();
        // try {
        //     const id = this.decodeToken && this.decodeToken.id;
        //     if (id) {
        //         await httpClient.patch(`usuarios/${id}`, { endpointArn: null });
        //     }
        //     EventEmitter.emit('auth.logout', { oldToken: this.token });
        // } catch (error) {
        //     logger.warn('[AUTH] LOGOUT ERROR', error);
        //     logger.warn('Não foi possivél remover o arn do usuário');
        // }
    }

    async createNewUser(data: { celular: string, email: string, senha: string }) {
        if (!data) {
            this.emitCreateUserError({}, 'CNU-002');
            return;
        }
        const { celular, email, senha } = data;
        const password = senha;
        try {
            const response = await axios.patch(`${this.createUserUrl}${celular}`, {
                email,
                password,
            });
            const token = response.data && response.data.token;
            this.setToken(token);
            this.emitLoginSuccess();
        } catch (error) {
            this.emitCreateUserError(error);
        }
    }
}

const appAuth = new AppAuth();
export default appAuth;
