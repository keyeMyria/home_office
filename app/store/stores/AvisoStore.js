// @flow

import { observable, extendObservable, action } from 'mobx';
import { AvisoService } from '../../services';

class AvisoStore {
    service: AvisoService;
    @observable avisos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new AvisoService();
    }

    async load() {
        const result = await this.service.get();
        this.avisos = result.avisos;
    }
}

const store = new AvisoStore();
store.load();

export default store;
