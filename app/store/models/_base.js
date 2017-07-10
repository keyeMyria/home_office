// @flow
// import R from 'ramda';
import { observable, extendObservable, computed } from 'mobx';
import axios from 'axios';

// Constantes
const BASE_URI = 'http://educare.digital:8080/api/';
const DEFAULT_ERR_MSG = 'Erro HTTP:';

// Symbols
const MODEL_PK = Symbol('educare-model-pk');
const HAS_MANY = Symbol('educare-model-has-many');
const HAS_ONE = Symbol('educare-model-has-one');
const COUNT = Symbol('educare-model-count');
const CURRENT_PAGE = Symbol('educare-model-current-page');
const TOTAL_PAGES = Symbol('educare-model-total-pages');
const PAGE_SIZE = Symbol('educare-model-page-size');

// Create a singleton axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URI,
    timeout: 2000,
    headers: {
        Authorization: 'AUTH_TOKEN',
        'Content-Type': 'application/json',
    },
});

// Models register singleton
const MODELS_REGISTER: Map<string, Class<Model>> = new Map();

type Decorator$Options = {
    name: string,
    path: string,
    fields: {
        [string]: any,
    },
    related: {
        [string]: { type: Symbol, model: Class<Model> | string },
    },
};

/**
 * Type for ObservableMap from mobx
 */
declare class ObservableMap<V> extends Map<string, V> {
    toJS(): { [string]: V },
    merge(values: Array<[string, V]> | { [string]: V } | Map<string, V>): void,
    values(): Array<V>,
}

/**
 * Return the pk name based on the config object
 */
function getPKfieldName(fields: Object): string {
    return Object.keys(fields).filter(k => fields[k] === MODEL_PK)[0];
}

/**
 * Get model from string or Class
 */
function getModel(model: Class<Model> | string): Class<Model> {
    if (typeof model === 'string') {
        if (!MODELS_REGISTER.has(model)) {
            throw Error(`Model '${model}' não encontrado `);
        }
        // $FlowFixMe
        return MODELS_REGISTER.get(model);
    }
    return model;
}

/**
 * Model class decorator
 */
function register({ name, path, fields, related }: Decorator$Options = {}) {
    if (!name) {
        throw Error('a name must be defined for the Model');
    }

    return (klass: Class<Model>) => {
        MODELS_REGISTER.set(name, klass);
        const target = klass;

        // $FlowFixMe
        Object.defineProperty(target.prototype, 'pk', {
            get() {
                const pkName = getPKfieldName(fields);
                if (!pkName) {
                    throw Error(`pk não definida no model ${name}`);
                }
                return this[pkName];
            },
            configurable: true,
        });

        Object.keys(related).forEach((key) => {
            let descriptor = {
                get() {
                    const { type, model } = related[key];
                    const RelatedModel = getModel(model);
                    if (type === HAS_MANY) {
                        const relatedKeys = this[`_related_${key}`].slice();
                        if (relatedKeys.length) {
                            return RelatedModel.values().filter(
                                instance => instance.pk in this[`_related_${key}`],
                            );
                        } else {
                            console.log('TODO: Carregar à partir dos links');
                            // const link = this._links[key];
                            // RelatedModel.fromLink(link).then(response);
                        }
                        return [];
                    } else if (type === HAS_ONE) {
                        return this[`_${key}`];
                    }
                },
                configurable: true,
            };
            descriptor = computed(target.prototype, key, descriptor) || descriptor;
            Object.defineProperty(target.prototype, key, descriptor);
            Object.defineProperty(target.prototype, `_related_${key}`, {
                value: observable([]),
            });
        });

        target.$observableMap = observable.map({});
        target.path = path;
        target.name = name;
        target.fields = fields;
        target.related = related;
        return target;
    };
}

function errorHandler(message) {
    const errMessage = typeof message === 'string' ? message : DEFAULT_ERR_MSG;
    const func = err => console.warn(errMessage, err); // eslint-disable-line no-console
    if (typeof message !== 'string') {
        return func(message);
    }
    return func;
}

/**
 * Model Base class
 */
class Model {
    static $observableMap: ObservableMap<this>;

    static fields: { [string]: any };
    static related: { [string]: { type: Symbol, model: Class<Model> | string } };
    static name: string;
    static path: string;

    _links: { [string]: string };
    pk: string | number;
    $lastData: Object;

    /**
     * Gets the model from the current collection and returns it
     *
     * if reload is true, reloads the model from the web api
     *
     */
    static async get(key: string | number, reload = false): Promise<this> {
        const _key = String(key);

        if (!reload && this.$observableMap.has(_key)) {
            return Promise.resolve(this.$observableMap.get(_key));
        }

        const path = `${this.path}/${_key}`;
        const promise = axiosInstance
            .get(path)
            .then(response => response.data)
            .then((response) => {
                if (this.$observableMap.has(_key)) {
                    // $FlowFixMe
                    this.$observableMap.get(_key).update(response);
                } else {
                    this.set(_key, new this(response));
                }
                return this.$observableMap.get(_key);
            })
            .catch(errorHandler);

        if (this.$observableMap.has(_key)) {
            return Promise.resolve(this.$observableMap.get(_key));
        }

        return promise;
    }

    static set(key: string | number, model: Model): void {
        this.$observableMap.set(String(key), model);
    }

    static values(): Array<this> {
        return this.$observableMap.values();
    }

    static fromLink(path: string): Promise<Model> {
        // TODO
        return axiosInstance.get(path);
    }

    static fecthAll() {
        // TODO
    }

    static nextPage() {
        // TODO
    }

    _parseMeta(json) {
        if (typeof this.parseMeta === 'function') {
            if (!this.parseMeta(json)) {
                return;
            }
        }
        const isMultiple = !!json.page;
        this._links = json._links;
        if (isMultiple) {
            // $FlowFixMe
            this[COUNT] = json.page.totalElements;
            // $FlowFixMe
            this[CURRENT_PAGE] = json.page.number;
            // $FlowFixMe
            this[TOTAL_PAGES] = json.page.totalPages;
            // $FlowFixMe
            this[PAGE_SIZE] = json.page.size;
        }
    }

    get _selfLink() {
        return this._links.self;
    }

    _parseRelated(json: Object): void {
        if (typeof this.parseRelated === 'function') {
            if (this.parseRelated(json) === false) {
                return;
            }
        }
        const isMultiple = !!json.page;
        const _embedded = json._embedded;

        Object.keys(this.constructor.related).forEach((key) => {
            const RelatedModel = getModel(this.constructor.related[key].model);
            const type = this.constructor.related[key].type;

            if (!isMultiple && Array.isArray(_embedded[key]) && type === HAS_MANY) {
                if (type === HAS_MANY && Array.isArray(_embedded[key])) {
                    // $FlowFixMe
                    const relatedList = this[`_related_${key}`];

                    _embedded[key].forEach((data) => {
                        const instance = new RelatedModel(data);
                        RelatedModel.set(instance.pk, instance);
                        if (relatedList.indexOf(instance.pk) === -1) {
                            // $FlowFixMe
                            this[`_related_${key}`].push(instance.pk);
                        }
                    });
                } else if (type === HAS_ONE && typeof _embedded[key] === 'object') {
                    this[`_${key}`] = new RelatedModel(_embedded[key]);
                }
            } else {
            }
        });
    }

    constructor(data: Object) {
        this.$lastData = data;

        this._parseJson(data);
        this._parseMeta(data);
        this._parseRelated(data);

        this.constructor.set(this.pk, this);
    }

    /**
     *
     */
    _parseJson(json: Object): void {
        Object.keys(this.constructor.fields).forEach((key) => {
            let value = json[key];
            if (this.constructor.fields[key] === MODEL_PK) {
                // $FlowFixMe
                this[key] = value || null;
                return;
            }
            if (typeof value !== 'number') {
                value = value || this.constructor.fields[key];
            }
            if (typeof value === 'object' && value !== null) {
                value = value.default;
            }
            extendObservable(this, { [key]: value });
        });
    }

    /**
     * Updates the model with new values
     */
    update(data: Object) {
        this._parseJson(data);
        this._parseMeta(data);
        this._parseRelated(data);
        this.constructor.set(this.pk, this);
    }
}

export default {
    Model,
    register,
    // Symbols
    PK: MODEL_PK,
    HAS_MANY,
    HAS_ONE,
};
