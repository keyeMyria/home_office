// @flow
import _ from 'underscore';
import httpClient from './../../lib/HttpClient';

/**
 * BASE SERVICE
 */
export default class BaseService {
    _axios: any;
    _path: string;

    constructor(path: string) {
        this._path = path;
        this._axios = httpClient;
    }

    get fullPath(): string {
        return `${this._axios._baseUri}/${this._path}`;
    }

    // AXIOS ABSTRACTION

    async get(params?: Object) {
        return this._get(this._path, { params });
    }

    async delete(id: number) {
        return this._delete(`${this._path}/${id}`);
    }

    async head() {
        return this._head(this._path);
    }

    async post(data?: any) {
        return this._post(this._path, data);
    }

    async put(data?: any) {
        return this._put(this._path, data);
    }

    async patch(data?: any | EntityService) {
        let config; // custom
        if (data instanceof EntityService) {
            data = data.fullPath; // eslint-disable-line
            config = { headers: { 'Content-Type': 'text/uri-list' } };
        }
        return this._patch(this._path, data, config);
    }

    // AXIOS BASIC

    async _request(config: any) {
        return this._invoke(() => this._axios.request(config));
    }

    async _get(url: string, config?: any) {
        return this._invoke(() => this._axios.get(url, config));
    }

    async _delete(url: string, config?: any) {
        console.log(url);
        return this._invoke(() => this._axios.delete(url, config));
    }

    async _head(url: string, config?: any) {
        return this._invoke(() => this._axios.head(url, config));
    }

    async _post(url: string, data?: any, config?: any) {
        return this._invoke(() => this._axios.post(url, data, config));
    }

    async _put(url: string, data?: any, config?: any) {
        return this._invoke(() => this._axios.put(url, data, config));
    }

    async _patch(url: string, data?: any, config?: any) {
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
                    result[key][index] = _.isObject(val)
                        ? this._parseObject(val)
                        : val;
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

    search(params: Object, funcName?: string) {
        // TODO: refactor
        // This way of get the search name is not ideial since arguments.callee is
        // is not part of the EcScript especification anymore, a should be deprecated in
        // a future release of JavaScriptCore.
        // eslint-disable-next-line no-caller, no-restricted-properties
        const name = funcName || arguments.callee.caller.name;
        const service = new BaseService(`${this._path}/search/${name}`);
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
