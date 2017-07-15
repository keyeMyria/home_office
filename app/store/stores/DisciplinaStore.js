// @flow

import { observable, extendObservable, action } from 'mobx';
import { DisciplinaService } from '../../services';

class DisciplinaStore {
    service: DisciplinaService;
    @observable disciplinas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new DisciplinaService();
    }

    async load() {
        const result = await this.service.get();
        this.disciplinas = result.disciplinas;
    }
}

const store = new DisciplinaStore();
store.load();

export default store;
