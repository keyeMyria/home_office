// @flow

import moment from 'moment';
import { getModel } from './register';

export function String() {
    return (value: *) => (value ? `${value}` : '');
}

export function Integer() {
    return (value: *) => parseInt(value, 10) || null;
}

export function Float() {
    return (value: *) => parseFloat(value) || null;
}

export function Array() {
    return (value: *) => value;
}

export function ObjectType() {
    return (value: *) => value;
}

export function ForeignKey(Type: *) {
    if (!Type) {
        throw Error('models.ForeignKey, deve receber uma string ou Classe');
    }

    let Model = Type;

    const func = (value: *) => {
        if (!value) return null;
        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return new Model(value);
    };

    func.related = true;
    func.relatedType = 'ForeignKey';
    func.relatedModel = () => (typeof Model === 'string' ? getModel(Model) : Model);
    return func;
}

export function ManyToMany(Type: *) {
    if (!Type) {
        throw Error('models.ManyToMany, deve receber uma string ou Classe');
    }
    let Model = Type;

    const func = (value: *) => {
        if (!value) return undefined;

        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return Model.fromArray(value);
    };

    func.related = true;
    func.relatedType = 'ManyToMany';
    func.relatedModel = () => (typeof Model === 'string' ? getModel(Model) : Model);
    return func;
}

export function OneToMany(Type: *) {
    if (!Type) {
        throw Error('models.OneToMany, deve receber uma string ou Classe');
    }
    let Model = Type;

    const func = (value: *) => {
        if (!value) return undefined;
        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return Model.fromArray(value);
    };

    func.related = true;
    func.relatedType = 'OneToMany';
    func.relatedModel = () => (typeof Model === 'string' ? getModel(Model) : Model);

    return func;
}

export function Date() {
    const func = (value: *) => (value ? moment(value) : moment().startOf('day'));
    func.toJS = value => moment(value).format('YYYY-MM-DD');

    return func;
}

export function DateTime() {
    const func = (value: *) => (value ? moment(value) : moment().startOf('day'));
    func.toJS = value => new global.Date(value).toJSON();

    return func;
}

export function PrimaryKey() {
    return (value: *, self: *, key: string) => {
        self.pk = value; // eslint-disable-line no-param-reassign
        self._pkName = key; // eslint-disable-line no-param-reassign
        return value;
    };
}

export function Boolean() {
    return (value: *) => !!value;
}

export function Static(value: string) {
    return () => value;
}
