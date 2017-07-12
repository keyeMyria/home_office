// @flow

import { observable, extendObservable, action } from 'mobx';
import { TrabalhoService } from '../../services';

class TrabalhoStore {
    service: TrabalhoService;
    @observable trabalhos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new TrabalhoService();
    }

    async load() {
        const result = await this.service.get();
        this.trabalhos = result.trabalhos;
    }
}

const store = new TrabalhoStore();
store.load();

export default store;
