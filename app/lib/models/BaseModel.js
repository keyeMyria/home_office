// @flow
import { observable } from 'mobx';

export default class BaseModel {
    _data$: any;
    _links: { [string]: any };
    static fields = {};

    // eslint-disable-next-line consistent-return
    constructor(data: Object) {
        if (Array.isArray(data)) {
            return data.map(d => new this.constructor(d));
        }
        if (data) {
            const fields = this.constructor.fields;
            const result: { [string]: any } = {};
            Object.keys(fields).forEach((key) => {
                result[key] = fields[key](data[key], this, key);
            });
            this._data$ = observable(result);
            this._links = data.link;
        } else {
            this._data$ = observable({});
        }
    }
}
