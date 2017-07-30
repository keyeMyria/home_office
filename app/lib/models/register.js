// @flow
import type BaseModel from './BaseModel';

const MODELS_REGISTER: Map<string, Class<BaseModel>> = new Map();

/**
 * Aceita uma string como parametro e retorna o Model, definido com esse nome.
 *
 * Caso nome não exista no registro, lança uma exceção.
 */
export function getModel(name: string): Class<BaseModel> {
    const Model = MODELS_REGISTER.get(name);
    if (Model) {
        return Model;
    }
    throw Error(`Model com nome ${name}, não foi encontrado no registro`);
}

/**
 * Registra um Model
 */
export function register(name: string | [string], fields: Object) {
    if (!name) {
        throw Error('you must define a name for the Model');
    }

    if (!fields || typeof fields !== 'object') {
        throw Error('fields must be an object');
    }

    return (klass: any) => {
        const target = klass;
        const [nameSingular, pluralName] = [].concat(name);
        target.name = nameSingular;
        target.collectionName = pluralName || `${nameSingular.toLowerCase()}s`;
        target.fields = fields;

        Object.keys(fields).forEach((key) => {
            Object.defineProperty(target.prototype, key, {
                get() {
                    return this._data$[key];
                },
                set(value) {
                    this._data$[key] = value;
                },
                configurable: true,
            });
        });
        MODELS_REGISTER.set(nameSingular, target);
        return target;
    };
}
