// @flow
import { observable } from 'mobx';
import CONFIG from './../../../config';

const ModelSymbol = '@@BaseModelInstance'; // JsCore does not support true Symbol

export default class BaseModel {
    _data$: any;
    _links: { [string]: any };
    pk: number;
    static fields = {};
    static name = '';
    static collectionName = '';

    static fromArray(data: Array<Object>): Array<this> {
        return data.map(d => new this(d));
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
        if (this.pk) {
            return `${baseUrl}${name}/${this.pk}`;
        }
        return null;
    }
}
