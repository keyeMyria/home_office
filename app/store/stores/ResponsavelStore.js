// @flow

import { observable, extendObservable, action } from 'mobx';
import { ResponsavelService } from '../../services';

class ResponsavelStore {
    service: ResponsavelService;
    @observable responsaveis: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ResponsavelService();
    }

    async load() {
        const result = await this.service.get();
        this.responsaveis = result.responsaveis;
    }
}

const store = new ResponsavelStore();
store.load();

export default store;
