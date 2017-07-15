// @flow

import { observable, extendObservable, action } from 'mobx';
import { TopicoService } from '../../services';

class TopicoStore {
    service: TopicoService;
    @observable topicos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new TopicoService();
    }

    async load() {
        const result = await this.service.get();
        this.topicos = result.topicos;
    }
}

const store = new TopicoStore();
store.load();

export default store;
