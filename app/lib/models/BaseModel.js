// @flow
import { observable } from 'mobx';
import CONFIG from './../../../config';
import { CollectionService } from './../services';
import logger from './../logger';

const ModelSymbol = '@@BaseModelInstance'; // JsCore does not support true Symbol

export default class BaseModel {
    _data$: any;
    _links: { [string]: any };
    _pkName: string;
    pk: number;
    /**
     * Represeta os campos do modelo, definidos no decorator `@register`
     */
    static fields = {};
    /**
     * Nome do model
     */
    static name = '';
    /**
     * Nome da collection, por padrão é definido como o nome do modelo com um
     * 's' no final deste.
     */
    static collectionName = '';

    /**
     * Array com o nomes dos campos que são relações
     */
    static relatedFields = [];

    /**
     * Recebe um array de objetos e retorna um array de modelos
     * @param {Array} data
     */
    static fromArray(data: Array<Object>): Array<this> {
        logger.assert(Array.isArray(data), 'Não é um array');
        return data.map(d => new this(d));
    }

    /**
     * Método que usa o endpoint `/search`das collections para filtrar os dados
     * @param {Object} params
     * @param {String} funcName
     */
    static search(params: { [string]: any }, funcName: string) {
        return new CollectionService(this.collectionName)
            .search(params, funcName)
            .then(results => this.fromArray(results[this.collectionName]));
    }

    /**
     * Retorna todos os registros desse modelo
     */
    static all() {
        return new CollectionService(this.collectionName).get().then((results) => {
            const resultsArray = results[this.collectionName];
            logger.assert(
                Array.isArray(resultsArray),
                'Resultado não é um array, keys: %s',
                Object.keys(results).join(','),
            );

            return this.fromArray(results[this.collectionName]);
        });
    }

    /**
     * Faz o `fecth` de um modelo usando a pk deste
     * @param {Number} id
     */
    static getOne(id: number | string) {
        return new CollectionService(this.collectionName)
            .one(id)
            .get()
            .then(results => new this(results));
    }

    // eslint-disable-next-line consistent-return
    constructor(data: Object | Array<Object>) {
        // $FlowFixMe
        this[ModelSymbol] = true; // Hack to detect subclass

        if (Array.isArray(data)) {
            logger.error(
                'DEPRECATED -> Não passe arrays para o constructor dos models, ' +
                    'use o método estático "fromArray"',
            );
            return data.map(d => new this.constructor(d));
        }
        return this._setData(data);
    }

    /**
     * Popula os campos do modelo
     * @param {Object} data
     */
    _setData(data: Object = {}): this {
        const fields = this.constructor.fields;
        if (!this._data$) {
            const newData = Object.keys(fields).reduce(
                (result, key) =>
                    Object.assign(result, { [key]: fields[key](data[key], this, key) }),
                {},
            );
            this._data$ = observable(newData);
        } else {
            Object.keys(fields).forEach((key) => {
                this._data$[key] = fields[key](data[key], this, key);
            });
        }

        this._links = data.link || {};
        return this;
    }

    /**
     * Reloads the model from the API
     */
    async refresh() {
        if (this.pk) {
            try {
                const data = await this._getSingleService().get();
                this._setData(data);
            } catch (error) {
                logger.error(error);
            }
        }
    }

    /**
     * Salva o modelo
     *
     * Quando a `pk` estiver definida salva usando um put, caso contrario faz um post
     * em todos os casos retorna um novo model à partir do retorno da API
     */
    async save() {
        let data;
        if (this.pk) {
            data = await this._getSingleService().put(this.toJS());
        } else {
            data = await this._getCollectionService().post(this.toJS());
        }
        this._setData(data);
        return this;
    }

    async delete() {
        if (this.pk) {
            await this._getCollectionService().delete(this.pk);
        }
        return this;
    }

    async saveRelated(name: string, related: Array<BaseModel>) {
        if (related && this.pk) {
            const relatedLinks = related.map(m => m._selfLink).join('\n');
            await this._getSingleService()
                .all(name)
                .put(relatedLinks, true);
        } else {
            throw new Error(
                'Não é possivél salvar relacionamentos em um model que não contem uma PK',
            );
        }
    }

    /**
     * Retorna a representação do objeto no formato aceito pela API,
     * convertendo qualquer ForeignKey em um link
     */
    toJS(): Object {
        const result = {};
        const fields = this.constructor.fields;
        Object.keys(fields).forEach((key) => {
            if (fields[key].related && fields.relatedType !== 'ForeignKey') return;
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

    isNew(): boolean {
        return !this.pk;
    }

    /**
     * Retorna um campo relacionado à partir dos links
     * Caso o link não exista retorna uma promise rejeitada com o erro
     */
    getRelated(name: string) {
        const field = !this.constructor.fields[name];
        if (!field || !field.related) {
            const error = new Error(`Field "${name}" is not a related field`);
            error.type = 'NoRelatedField';
            return Promise.reject(error);
        }
        const link = !this._links[name];
        if (!link) {
            const error = new Error(`No link was found for field "${name}"`);
            error.type = 'NoLinkForField';
            return Promise.reject(error);
        }
        const RelatedModel = field.relatedModel();
        if (field.relatedType === 'ForeignKey') {
            return link
                .one('')
                .get()
                .then(data => new RelatedModel(data));
        }
        return link.get().then(data => RelatedModel.fromArray(data));
    }

    /**
     * Retorna o service que será usado para os collections
     */
    _getCollectionService(): CollectionService {
        const collectionName = this.constructor.collectionName;
        return new CollectionService(collectionName);
    }

    /**
     * Retorna o srevice que será usado pra quando for necessário somente um objeto
     */
    _getSingleService(): CollectionService {
        return this._getCollectionService().one(this.pk);
    }

    /**
     * Retorna o link desse objeto na API
     */
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
