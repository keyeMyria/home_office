// @flow

import { observable, extendObservable, action } from 'mobx';
import { ListaGeradaService } from '../../services';

class ListaGeradaStore {
    service: ListaGeradaService;
    @observable listasGeradas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ListaGeradaService();
    }

    async load() {
        const result = await this.service.get();
        this.listasGeradas = result.listasGeradas;
    }
}

const store = new ListaGeradaStore();
store.load();

export default store;
