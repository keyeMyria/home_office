// @flow

import { observable, extendObservable, action } from 'mobx';
import { TurmaService } from '../../services';

class TurmaStore {
    service: TurmaService;
    @observable turmas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new TurmaService();
    }

    async load() {
        const result = await this.service.get();
        this.turmas = result.turmas;
    }
}

const store = new TurmaStore();
store.load();

export default store;
