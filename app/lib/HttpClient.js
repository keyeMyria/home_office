// @flow
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import type { AxiosXHRConfig, AxiosPromise } from 'axios';
import CONFIG from './../../config';
import uiStore from './../stores/UiStore';

/**
 * Use this class to make all the http requests in the application;
 * When the user login, use the setToken() method to save the current token in
 * in the class state
 */
class HttpClient {
    token: ?string = null;
    _baseUri: string = CONFIG.API.BASE_URL;
    _axios = axios.create();

    constructor() {
        this._axios.defaults.baseURL = this._baseUri;
        this._axios.defaults.headers.common['Content-Type'] = 'application/json';
        this._getTokenFromAsyncStorage();
    }

    getUrl(...args: [string | number]): string {
        return `this._baseUri${args.join('/')}`;
    }

    setBaseURL(url: string): this {
        this._baseUri = url;
        this._axios.defaults.baseURL = this._baseUri;
        return this;
    }

    /**
     * Saves the token in AsyncStorage
     */
    async _saveTokenInAsyncStore() {
        return AsyncStorage.setItem(CONFIG.ASYNC_STORE.TOKEN, this.token);
    }

    /**
     * Retrieves the token saved in AsyncStorage
     */
    async _getTokenFromAsyncStorage() {
        const token = await AsyncStorage.getItem(CONFIG.ASYNC_STORE.TOKEN);
        if (token) {
            this.token = token;
            this._axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        }
        uiStore.httpClientFinishInit = true;
    }

    /**
     * Saves the token to use in future requests;
     */
    setToken(token: string): this {
        this.token = token;
        this._axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this._saveTokenInAsyncStore();
        return this;
    }

    request(config: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.request(config);
    }

    get(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.get(url, config);
    }

    delete(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.delete(url, config);
    }

    head(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.head(url, config);
    }

    post(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.post(url, data, config);
    }

    put(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.put(url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.patch(url, data, config);
    }
}

const httpClient = new HttpClient();

export default httpClient;
