// @flow
import { AsyncStorage, Alert } from 'react-native';
import { observable, action, computed } from 'mobx';
import httpClient from './../lib/HttpClient';

// Config
import { getConfig } from './../lib/config';

import { Turma } from './../models';

//Other Stores
import alunoStore from './AlunoStore';

type RoleEnum = 'ALUNO' | 'PROFESSOR' | 'RESPONSAVEL';
type UserType = {
  id: number,
  role: RoleEnum,
  nome: string,
  imagem: string,
  email: string,
  telefones: Array<string>,
  turma?: Turma,
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

  constructor() {
    this._getUserFromAsyncStorage();
  }

  @computed
  get avatar(): string {
    const gravatarUrl = 'https://www.gravatar.com/avatar/0?d=mm&f=y';
    if (!this.user) return gravatarUrl;
    try {
      const url = new URL(this.user.imagem); // eslint-disable-line
      return String(url);
    } catch (error) {
      return gravatarUrl;
    }
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
    return this.user && !!this.user.turma && new Turma(this.user.turma);
  }

  @computed
  get role(): ?RoleEnum {
    return this.user && this.user.role;
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
      default:
        break;
    }
  }

  @action
  logout() {
    this.user = null;
    AsyncStorage.removeItem(getConfig('@educare:async_store:user'));
  }

  /**
     * Handles the logic of the login;
     */
  async login(username: string, password: string) {
    this.loading = true;
    const { user } = await this._makeLogin(username, password);
    this.setUser(user)._saveUserInAsyncStorage(user);
    this.loading = false;
  }

  /**
     * Make the login of a user and return the token and the user object
     */
  async _makeLogin(
    username: string,
    password: string
  ): Promise<loginReturnType> {
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
        Alert.alert(
          'Dados Inválidos',
          'O usuário ou senha informada são inválidos'
        );
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
    if (!user) return;
    this.setUser(user);
  }
}

const userStore = new UserStore();

export default userStore;
