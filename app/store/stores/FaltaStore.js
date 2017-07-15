// @flow

import { observable, extendObservable, action } from 'mobx';
import { FaltaService } from '../../services';

class FaltaStore {
    service: FaltaService;
    @observable faltas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new FaltaService();
    }

    async load() {
        const result = await this.service.get();
        this.faltas = result.faltas;
    }
}

const store = new FaltaStore();
store.load();

export default store;
