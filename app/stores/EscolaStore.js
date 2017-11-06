// @flow
import { AsyncStorage } from 'react-native';
import { observable, computed, action } from 'mobx';
import _ from 'lodash';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';
import auth from './../lib/auth';

import httpClient from './../lib/HttpClient';
import logger from './../lib/logger';
import CONFIG from './../../config';
import uiStore from './UiStore';

type ApiEscolasReturn = Array<{
    escola: string,
    api: string,
}>;

type EscolaConfigItem = {
    tipo: string,
    chave: string,
    valor: string,
};

type EscolaConfig = Array<EscolaConfigItem>;

/**
 * Classe responsável pelo gerenciamento de escolas e configurações destas
 */
class EscolaStore extends BaseStore {
    /**
     * URL base da escola selecionada
     */
    @observable escolaBaseURL: string;
    /**
     * Nome da escola selecionada
     */
    @observable escolaNome: string;
    /**
     * Configuração da escola selecionada
     */
    @observable escolaConfig: EscolaConfig;
    /**
     * Quando false, os dados foram restaudarados da AsyncStorage
     */
    @observable finishInit: boolean = false;

    /**
     * Retorna o valor de uma configuração
     */
    getConfig(chave: string): any {
        const item: ?EscolaConfigItem = _.find(this.escolaConfig, ['chave', chave]);

        if (!item) {
            return null;
        }

        switch (item.tipo) {
        case 'string':
            return String(item.valor);
        case 'number':
            return Number(item.valor);
        default:
            return item.valor;
        }
    }

    @action
    clear() {
        this.escolaBaseURL = undefined;
        this.escolaNome = undefined;
        this.escolaConfig = undefined;

        AsyncStorage.clear();
    }

    @computed
    get hasEscolaSelected(): boolean {
        return !!this.escolaBaseURL;
    }

    constructor() {
        super();
        this._loadFromAsyncStorage();
        EventEmitter.on('auth.logout', () => {
            this.clear();
        });
    }

    async _saveToAsyncStorage() {
        const escolaConfig = JSON.stringify(this.escolaConfig);
        AsyncStorage.setItem(CONFIG.ASYNC_STORE.ESCOLA_NOME, this.escolaNome);
        AsyncStorage.setItem(CONFIG.ASYNC_STORE.ESCOLA_ENDPOINT, this.escolaBaseURL);
        AsyncStorage.setItem(CONFIG.ASYNC_STORE.ESCOLA_CONFIG, escolaConfig);
    }

    async _loadFromAsyncStorage() {
        const results = await Promise.all([
            AsyncStorage.getItem(CONFIG.ASYNC_STORE.ESCOLA_ENDPOINT),
            AsyncStorage.getItem(CONFIG.ASYNC_STORE.ESCOLA_NOME),
            AsyncStorage.getItem(CONFIG.ASYNC_STORE.ESCOLA_CONFIG),
        ]);

        const [escolaBaseURL, escolaNome, escolaConfig] = results;

        if (escolaBaseURL && escolaConfig && escolaNome) {
            CONFIG.API.DOMAIN = escolaBaseURL;
            httpClient.setBaseURL(CONFIG.API.BASE_URL);

            this.escolaBaseURL = escolaBaseURL;
            this.escolaNome = escolaNome;
            this.escolaConfig = JSON.parse(escolaConfig);
        }
        auth.loadToken();
        this.finishInit = true;
        uiStore.escolaStoreFinishInit = true;
    }

    async getEscolas(): Promise<ApiEscolasReturn> {
        try {
            const response = await httpClient.get(CONFIG.API.ESCOLAS_URL, {
                headers: {
                    Authorization: '',
                },
            });
            return response.data._embedded.escolas;
        } catch (error) {
            logger.error('EscolaStore.getEscolas', error);
            return [];
        }
    }

    async selectEscola(nome: string, apiUrl: string): Promise<boolean> {
        try {
            CONFIG.API.DOMAIN = apiUrl;
            const response = await httpClient.setBaseURL(CONFIG.API.BASE_URL).get('configuracoes');
            const config = response.data._embedded.configuracoes;

            this.escolaConfig = config;
            this.escolaBaseURL = apiUrl;
            this.escolaNome = nome;
            await this._saveToAsyncStorage();
            return true;
        } catch (error) {
            logger.error('EscolaStore.selectEscola', error);
            return false;
        }
    }
}

const escolaStore = new EscolaStore();

export default escolaStore;
