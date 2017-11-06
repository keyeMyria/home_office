// @flow
import axios from 'axios';
import type { AxiosXHRConfig, AxiosPromise } from 'axios';
import EventEmitter from 'react-native-eventemitter';

import logger from './logger';
import CONFIG from './../../config';

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
    }

    getUrl(...args: [string | number]): string {
        return `this._baseUri${args.join('/')}`;
    }

    setBaseURL(url: string): this {
        this._baseUri = url;
        this._axios.defaults.baseURL = this._baseUri;
        return this;
    }

    errorHandler = (error: any) => {
        if (this.token && error.response && error.response.status === 401) {
            logger.error(`[HTTP CLIENT] Invalid token (401) [${error.config.url}]`);
            EventEmitter.emit('auth.invalid_token', {});
        }
        return Promise.reject(error);
    };

    /**
     * Saves the token to use in future requests;
     */
    setToken(token: string): this {
        this.token = token;
        this._axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        return this;
    }

    /**
     * Clears the token
     */
    clearToken(): this {
        this.token = null;
        this._axios.defaults.headers.common.Authorization = '';
        return this;
    }

    request(config: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.request(config).catch(this.errorHandler);
    }

    get(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.get(url, config).catch(this.errorHandler);
    }

    delete(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.delete(url, config).catch(this.errorHandler);
    }

    head(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.head(url, config).catch(this.errorHandler);
    }

    post(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.post(url, data, config).catch(this.errorHandler);
    }

    put(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.put(url, data, config).catch(this.errorHandler);
    }

    patch(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.patch(url, data, config).catch(this.errorHandler);
    }
}

const httpClient = new HttpClient();

export default httpClient;
