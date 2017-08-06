// @flow
import { AsyncStorage, Alert } from 'react-native';
import { observable, action, computed } from 'mobx';

import httpClient from './../lib/HttpClient';

import UsuarioService from './../services/UsuarioService';

// Config
import logger from './../lib/logger';
import { getConfig } from './../lib/config';
import pushHandler from './../lib/push';
import { avatar } from './../lib/img';

import { Turma } from './../models';

// Other Stores
import uiStore from './UiStore';
import escolaStore from './EscolaStore';
import alunoStore from './AlunoStore';
import professorStore from './ProfessorStore';
import responsavelStore from './ResponsavelStore';

type RoleEnum = 'ALUNO' | 'PROFESSOR' | 'RESPONSAVEL';
type UserType = {
    id: number,
    role: RoleEnum,
    nome: string,
    imagem: string,
    email: string,
    telefones: string,
    turma?: Turma,
    endpointArn?: string,
};

type loginReturnType = {
    token: ?string,
    user: ?UserType,
};

/**
 * User store is common for all 'ROLES' in the application
 * this store is responsible for the basic information of the user.
 */

class UserStore {
    @observable loading = false; // if is waiting for any request
    @observable user: ?UserType; // the user object
    @observable finishInit: boolean = false;

    constructor() {
        this._getUserFromAsyncStorage();
    }

    @computed
    get avatar(): Object {
        return avatar(this.user && this.user.imagem);
    }

    @computed
    get endpointArn(): ?string {
        return this.user && this.user.endpointArn;
    }

    @computed
    get hasAuth(): boolean {
        return !!this.user;
    }

    @computed
    get id(): ?number {
        return this.user && this.user.id;
    }

    @computed
    get turma(): ?Turma {
        if (this.user && !!this.user.turma) {
            return new Turma(this.user.turma);
        }
        return undefined;
    }

    @computed
    get role(): RoleEnum {
        if (this.user && this.user.role) {
            return this.user.role;
        }
        return 'ALUNO';
    }

    @computed
    get homeScreen(): string {
        return {
            ALUNO: 'StudentHomeRouter',
            PROFESSOR: 'TeacherHomeRouter',
            RESPONSAVEL: 'ParentHomeRouter',
        }[this.role];
    }

    @computed
    get nome(): string {
        return this.user ? this.user.nome : '';
    }

    @computed
    get email(): string {
        return this.user ? this.user.email : '';
    }

    /**
     * Set the user for the store
     */
    @action
    setUser(user: ?UserType) {
        if (user) {
            this.user = user;
            this.setupUserStore(user);
        }
        return this;
    }

    setupUserStore(user: UserType) {
        switch (user.role) {
        case 'ALUNO':
            alunoStore.fetchAluno(user.id);
            break;
        case 'RESPONSAVEL':
            responsavelStore.fetchResponsavel(user.id);
            break;
        case 'PROFESSOR':
            professorStore.fetchProfessor(user.id);
            break;
        default:
            break;
        }
    }

    @action
    logout() {
        this.user = null;
        escolaStore.clear();
        AsyncStorage.clear();
        try {
            if (this.id) {
                const service = new UsuarioService();
                service.one(this.id).patch({ endpointArn: null });
            }
        } catch (error) {
            console.warn('Não foi possivél remover o arn do usuário');
        }
    }

    /**
     * Handles the logic of the login;
     */
    async login(username: string, password: string) {
        this.loading = true;
        const { user } = await this._makeLogin(username, password);
        if (user) {
            this.setUser(user)._saveUserInAsyncStorage(user);
        }
        this.loading = false;
    }

    async updateUser() {
        const userUrl = 'usuarios/search/findByJwtToken';
        const { data: user } = await httpClient.get(userUrl);
        this.user = user;
        pushHandler.registerWithSNS(user.endpointArn);
    }

    async loginToken(token: string) {
        try {
            logger.warn('FACEBOOK JWT TOKEN', token);
            const userUrl = 'usuarios/search/findByJwtToken';
            const { data: user } = await httpClient.setToken(token).get(userUrl);
            if (user) {
                this.setUser(user)._saveUserInAsyncStorage(user);
            }
            this.loading = false;
        } catch (error) {
            logger.warn(error);
            Alert.alert('Token Inválido', 'O token informado é inválido');
        }
    }

    /**
     * Make the login of a user and return the token and the user object
     */
    async _makeLogin(username: string, password: string): Promise<loginReturnType> {
        const errorReturn = { token: null, user: null };
        const authUrl = getConfig('@educare:api:auth_url');
        const userUrl = 'usuarios/search/findByJwtToken';

        try {
            const { data: { token } } = await httpClient.post(authUrl, {
                username,
                password,
            });
            if (!token) {
                return errorReturn;
            }
            const { data: user } = await httpClient.setToken(token).get(userUrl);
            return { token, user };
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Alert.alert('Dados Inválidos', 'O usuário ou senha informada são inválidos');
                return errorReturn;
            }
            // eslint-disable-next-line no-undef
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(JSON.stringify(error, null, 2));
            }
            return errorReturn;
        }
    }

    /**
     * Saves the curremt user in AsyncStorage
     */
    _saveUserInAsyncStorage(user: UserType) {
        const userKey = getConfig('@educare:async_store:user');
        AsyncStorage.setItem(userKey, JSON.stringify(user));
        return this;
    }

    /**
     * Get the user that is save in AsyncStorage
     */
    async _getUserFromAsyncStorage() {
        const userKey = getConfig('@educare:async_store:user');
        const user = await AsyncStorage.getItem(userKey);
        if (user) {
            this.updateUser();
            this.setUser(JSON.parse(user));
        }
        this.finishInit = true;
        uiStore.userStoreFinishInit = true;
    }
}

const userStore = new UserStore();

export default userStore;
