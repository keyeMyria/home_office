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

    errorHandler(error: any) {
        if (this.token && error.response && error.response.code === 401) {
            EventEmitter.emit('auth.invalid_token', {});
        }
        logger.warn('HTTP CLIENT ERROR', error);
    }

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
        return this._axios.request(config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    get(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.get(url, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    delete(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.delete(url, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    head(url: string, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.head(url, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    post(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.post(url, data, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    put(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.put(url, data, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }

    patch(url: string, data?: any, config?: AxiosXHRConfig<any>): AxiosPromise<any> {
        return this._axios.patch(url, data, config).catch((err) => {
            this.errorHandler(err);
            throw err;
        });
    }
}

const httpClient = new HttpClient();

export default httpClient;
