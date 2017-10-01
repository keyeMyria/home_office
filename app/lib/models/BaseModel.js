// @flow
import { observable } from 'mobx';
import CONFIG from './../../../config';
import { CollectionService } from './../services';

const ModelSymbol = '@@BaseModelInstance'; // JsCore does not support true Symbol

export default class BaseModel {
    _data$: any;
    _links: { [string]: any };
    _pkName: string;
    pk: number;
    static fields = {};
    static name = '';
    static collectionName = '';

    static fromArray(data: Array<Object>): Array<this> {
        return data.map(d => new this(d));
    }

    static search(params: { [string]: any }, funcName: string) {
        return new CollectionService(this.collectionName)
            .search(params, funcName)
            .then(results => this.fromArray(results[this.collectionName]));
    }

    static all() {
        return new CollectionService(this.collectionName)
        .get()
        .then(results => this.fromArray(results[this.collectionName]));
    }

    // eslint-disable-next-line consistent-return
    constructor(data: Object | Array<Object>) {
        // $FlowFixMe
        this[ModelSymbol] = true; // Hack to detect subclass

        if (Array.isArray(data)) {
            return data.map(d => new this.constructor(d));
        }
        if (data) {
            const fields = this.constructor.fields;
            const result: { [string]: any } = {};
            Object.keys(fields).forEach((key) => {
                // $FlowFixMe
                result[key] = fields[key](data[key], this, key);
            });
            this._data$ = observable(result);
            this._links = data.link || {};
        } else {
            this._data$ = observable({});
        }
    }

    toJS(): Object {
        const result = {};
        const fields = this.constructor.fields;
        Object.keys(fields).forEach((key) => {
            if (this._data$[key] !== undefined) {
                const value = this._data$[key];
                if (value && value[ModelSymbol]) {
                    result[key] = (value && value._selfLink) || undefined;
                } else {
                    result[key] = (value && value._selfLink) || value;
                }
            }
        });
        return result;
    }

    get _selfLink(): ?string {
        const link = this._links && this._links.self;
        if (link) {
            if (typeof link === 'string') {
                return link;
            } else if (link._path) {
                return link._path;
            }
        }
        const baseUrl = CONFIG.API.BASE_URL;
        const name = this.constructor.collectionName.toLowerCase();
        // $FlowFixMe
        const pk = this.pk || this[this._pkName];
        if (pk) {
            return `${baseUrl}${name}/${pk}`;
        }
        return null;
    }

}
