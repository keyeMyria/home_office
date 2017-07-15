// @flow

import { observable, extendObservable, action } from 'mobx';
import { ListaOnlineService } from '../../services';

class ListaOnlineStore {
    service: ListaOnlineService;
    @observable listasOnline: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ListaOnlineService();
    }

    async load() {
        const result = await this.service.get();
        this.listasOnline = result.listasOnline;
    }
}

const store = new ListaOnlineStore();
store.load();

export default store;
