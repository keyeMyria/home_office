// @flow

import { observable, extendObservable, action } from 'mobx';
import { AnoService } from '../../services';

class AnoStore {
    service: AnoService;
    @observable anos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new AnoService();
    }

    async load() {
        const result = await this.service.get();
        this.anos = result.anos;
    }
}

const store = new AnoStore();
store.load();

export default store;
