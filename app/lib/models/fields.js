// @flow

import moment from 'moment';
import { getModel } from './register';

export function String() {
    return value => `${value}`;
}

export function Integer() {
    return value => parseInt(value, 10) || null;
}

export function Float() {
    return value => parseFloat(value) || null;
}

export function Array() {
    return value => value;
}

export function ForeignKey(Type) {
    if (!Type) {
        throw Error('models.ForeignKey, deve receber uma string ou Classe');
    }

    let Model = Type;

    return (value) => {
        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return new Model(value);
    };
}

export function ManyToMany(Type) {
    if (!Type) {
        throw Error('models.ManyToMany, deve receber uma string ou Classe');
    }
    let Model = Type;

    return (value) => {
        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return new Model(value);
    };
}

export function OneToMany(Type) {
    if (!Type) {
        throw Error('models.OneToMany, deve receber uma string ou Classe');
    }
    let Model = Type;

    return (value) => {
        if (typeof Model === 'string') {
            Model = getModel(Model);
        }
        return new Model(value);
    };
}

export function Date() {
    return value => moment(value);
}

export function PrimaryKey() {
    return (value, self, key) => {
        self.pk = value; // eslint-disable-line no-param-reassign
        self._pkName = key; // eslint-disable-line no-param-reassign
        return value;
    };
}

export function Boolean() {
    return value => !!value;
}
