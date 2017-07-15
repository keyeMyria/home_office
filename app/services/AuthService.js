// @flow
import axios from 'axios';
import CONFIG from '../../config';
import { setToken } from './base/BaseService';
// import alunoStore from '../stores/AlunoStore';

export default class AuthService {
    _token: string;
    _url = CONFIG.API.AUTH_URL;
    _userUrl = `${CONFIG.API.BASE_URL}usuarios/search/findByJwtToken`;

    async login(username: string, password: string) {
        const token = await this.getToken(username, password);
        const user = await this.getUser();
        setToken(token);
        const store = await this.setAluno(user.id);
        return { token, user, store };
    }

    async setAluno(id) {
        const store = await alunoStore.fetchAluno(id);
        return store;
    }

    async getToken(username: string, password: string) {
        const response = await axios.post(this._url, { username, password });
        if (response.status === 200) {
            this._token = response.data.token;
            return this._token;
        }
        return null;
    }

    async getUser(): Object {
        if (!this._token) {
            return null;
        }
        const response = await axios.get(this._userUrl, {
            headers: {
                Authorization: `Bearer ${this._token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }

    get payload(): string {
        return this._token && this._token.split('.')[1];
    }
}
