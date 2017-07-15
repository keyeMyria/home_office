// @flow

import axios, { AxiosPromise, AxiosRequestConfig, AxiosInstance } from 'axios';
import _ from 'underscore';

import CONFIG from '../../../config';

const BASE_URI = CONFIG.API.BASE_URL;

const configs = {
    token: '',
    get Authorization() {
        return `Bearer ${this.token}`;
    },
};

export function setToken(token: string) {
    configs.token = token;
}

/**
 * BASE SERVICE
 */
export default class BaseService {
    _axios: AxiosInstance;
    _path: string;

    constructor(path: string) {
        this._path = path;
        this._axios = axios.create();

        this._axios.defaults.baseURL = BASE_URI;

        // TODO: Recuperar o token recebido da autenticação
        this._axios.defaults.headers.common.Authorization = configs.Authorization;
        this._axios.defaults.headers.common['Content-Type'] = 'application/json';
    }

    get fullPath(): string {
        return `${BASE_URI}/${this._path}`;
    }

    // AXIOS ABSTRACTION

    async get(params?: Object): AxiosPromise {
        return this._get(this._path, { params });
    }

    async delete(): AxiosPromise {
        return this._delete(this._path);
    }

    async head(): AxiosPromise {
        return this._head(this._path);
    }

    async post(data?: any): AxiosPromise {
        return this._post(this._path, data);
    }

    async put(data?: any): AxiosPromise {
        return this._put(this._path, data);
    }

    async patch(data?: any | EntityService): AxiosPromise {
        let config; // custom
        if (data instanceof EntityService) {
            data = data.fullPath; // eslint-disable-line
            config = { headers: { 'Content-Type': 'text/uri-list' } };
        }
        return this._patch(this._path, data, config);
    }

    // AXIOS BASIC

    async _request(config: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.request(config));
    }

    async _get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.get(url, config));
    }

    async _delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.delete(url, config));
    }

    async _head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.head(url, config));
    }

    async _post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.post(url, data, config));
    }

    async _put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.put(url, data, config));
    }

    async _patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._invoke(() => this._axios.patch(url, data, config));
    }

    // HELPERS

    _parseLinks(obj: any) {
        const result = {};

        _.map(_.keys(obj), (key) => {
            const value = obj[key];
            result[key] = new CollectionService(value.href);
        });

        return result;
    }

    _parseObject(obj: any): any {
        const result = {};

        _.map(_.keys(obj), (key) => {
            const value = obj[key];

            if (key === '_embedded') {
                Object.assign(result, this._parseObject(value));
            } else if (key === '_links') {
                result.link = this._parseLinks(value);
            } else if (_.isArray(value)) {
                result[key] = [];
                _.each(value, (val, index) => {
                    result[key][index] = _.isObject(val) ? this._parseObject(val) : val;
                });
            } else {
                result[key] = value;
            }
        });

        return result;
    }

    async _invoke(call: any): any {
        try {
            const { data } = await call();
            return this._parseObject(data);
        } catch (error) {
            // TODO: Tratar aqui o erro das chamadas rest
            // eslint-disable-next-line no-console
            console.warn('API_CALL_ERROR', error);
            return null;
        }
    }
}

/**
 * COLLECTION SERVICE
 */
export class CollectionService extends BaseService {
    _path: string;

    one(id: number): EntityService {
        return new EntityService(`${this._path}/${id}`);
    }

    search(params: Object) {
        // TODO: refactor
        // This way of get the search name is not ideial since arguments.callee is
        // is not part of the EcScript especification anymore, a should be deprecated in
        // a future release of JavaScriptCore.
        // eslint-disable-next-line no-caller, no-restricted-properties
        const service = new BaseService(`${this._path}/search/${arguments.callee.caller.name}`);
        return service.get(params);
    }
}

/**
 * ENTITY SERVICE (SINGLE)
 */
export class EntityService extends BaseService {
    _path: string;

    all(path: string): CollectionService {
        return new CollectionService(`${this._path}/${path}`);
    }
}
