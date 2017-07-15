// @flow

import { observable, extendObservable, action } from 'mobx';
import { AlunoService } from '../../services';

class AlunoStore {
    service: AlunoService;
    @observable alunos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new AlunoService();
    }

    async load() {
        const result = await this.service.get();
        this.alunos = result.alunos;
    }
}

const store = new AlunoStore();
store.load();

export default store;
