// @flow

import { observable, extendObservable, action } from 'mobx';
import { ProvaService } from '../../services';

class ProvaStore {
    service: ProvaService;
    @observable provas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ProvaService();
    }

    async load() {
        const result = await this.service.get();
        this.provas = result.provas;
    }
}

const store = new ProvaStore();
store.load();

export default store;
