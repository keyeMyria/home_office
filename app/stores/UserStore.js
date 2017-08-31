// @flow
import { Alert } from 'react-native';
import { observable, action, computed } from 'mobx';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';

import auth from './../lib/auth';
import type { DecodedToken, Role } from './../lib/auth';

import { avatar } from './../lib/img';

/**
 * User store is common for all 'ROLES' in the application
 * this store is responsible for the basic information of the user.
 */
class UserStore extends BaseStore {
    @observable loading: boolean = false; // if is waiting for any request
    @observable user: ?DecodedToken; // the user object

    constructor() {
        super();
        EventEmitter.on('auth.login_error', ({ message }) => {
            Alert.alert('Erro no Login', message);
            this.loading = false;
        });

        EventEmitter.on('auth.authenticated', ({ payload }) => {
            this.setUser(payload);
            this.loading = false;
        });

        EventEmitter.on('auth.invalid_token', () => {
            this.logout();
        });

        EventEmitter.on('auth.facebook_login_error', ({ type }) => {
            if (type === 'TOKEN') {
                Alert.alert(
                    'Erro no Login',
                    '[FBL-001] Não foi possivél realizar o login com facebook',
                );
            } else if (type === 'CELULAR_NOT_FOUND') {
                Alert.alert('Erro no Login', '[FBL-002] O celular informado não está cadastrado');
            }
            this.loading = false;
        });
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
    get role(): Role {
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
            DIRETOR: 'TeacherHomeRouter',
        }[this.role];
    }

    @computed
    get nome(): string {
        return this.user ? this.user.nome : '';
    }

    @computed
    get email(): string {
        return this.user ? this.user.sub : '';
    }

    @computed
    get isProfessor(): boolean {
        return !!this.user && this.user.role === 'PROFESSOR';
    }

    /**
     * Set the user for the store
     */
    @action
    setUser(user: ?DecodedToken) {
        if (user) {
            this.user = user;
        }
        return this;
    }

    @action
    logout() {
        this.user = null;
        auth.logout();
    }

    @action
    login(username: string, password: string) {
        this.loading = true;
        auth.login(username, password);
    }

    @action
    loginFacebook(celular: ?string) {
        this.loading = true;
        auth.loginFacebook(celular);
    }

    @action
    newUser(data: { celular: string, email: string, senha: string }) {
        if (!data) {
            Alert.alert('Erro no Login', '[CNU-001] Ocorreu um erro ao tentar criar o usuário');
            return;
        }
        auth.createNewUser(data);
    }
}

const userStore = new UserStore();

export default userStore;
