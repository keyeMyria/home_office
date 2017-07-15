// @flow

import { observable, extendObservable, action } from 'mobx';
import { RotinaService } from '../../services';

class RotinaStore {
    service: RotinaService;
    @observable rotinas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new RotinaService();
    }

    async load() {
        const result = await this.service.get();
        this.rotinas = result.rotinas;
    }
}

const store = new RotinaStore();
store.load();

export default store;
