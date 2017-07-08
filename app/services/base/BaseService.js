// @flow

import axios, { AxiosPromise, AxiosRequestConfig, AxiosInstance } from 'axios';
import _ from 'underscore';

const BASE_URI = 'http://localhost:8080/api';

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
    this._axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
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
      data = data.fullPath;
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
    var result = {};

    _.map(_.keys(obj), key => {
      const value = obj[key];
      result[key] = new CollectionService(value.href);
    });

    return result;
  }

  _parseObject(obj: any): any {
    var result = {};

    _.map(_.keys(obj), key => {
      const value = obj[key];

      if (key === '_embedded') {
        Object.assign(result, this._parseObject(value));
      } else if (key === '_links') {
        result['link'] = this._parseLinks(value);
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
