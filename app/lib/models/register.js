// @flow
import type BaseModel from './BaseModel';

const MODELS_REGISTER: Map<string, Class<BaseModel>> = new Map();

/**
 * Aceita uma string como parametro e retorna o Model, definido com esse nome.
 *
 * Caso nome não exista no registro, lança uma exceção.
 */
export function getModel(name: string): Class<BaseModel> {
    if (MODELS_REGISTER.has(name)) {
        return MODELS_REGISTER.get(name);
    }
    throw Error(`Model com nome ${name}, não foi encontrado no registro`);
}

/**
 * Registra um Model
 */
export function register(name, fields) {
    if (!name) {
        throw Error('you must define a name for the Model');
    }

    if (!fields || typeof fields !== 'object') {
        throw Error('fields must be an object');
    }

    return (klass) => {
        const target = klass;
        target.name = name;
        target.fields = fields;

        Object.keys(fields).forEach((key) => {
            Object.defineProperty(target.prototype, key, {
                get() { return this._data$[key]; },
                configurable: true,
            });
        });
        MODELS_REGISTER.set(name, target);
        return target;
    };
}
