// @flow

import { observable, extendObservable, action } from 'mobx';
import { NotaService } from '../../services';

class NotaStore {
    service: NotaService;
    @observable notas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new NotaService();
    }

    async load() {
        const result = await this.service.get();
        this.notas = result.notas;
    }
}

const store = new NotaStore();
store.load();

export default store;
