// @flow

import { observable, extendObservable, action } from 'mobx';
import { ProfessorService } from '../../services';

class ProfessorStore {
    service: ProfessorService;
    @observable professores: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ProfessorService();
    }

    async load() {
        const result = await this.service.get();
        this.professores = result.professores;
    }
}

const store = new ProfessorStore();
store.load();

export default store;
