// @flow

import { observable, extendObservable, action } from 'mobx';
import { TarefaService } from '../../services';

class TarefaStore {
    service: TarefaService;
    @observable exercicios: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new TarefaService();
    }

    async load() {
        const result = await this.service.get();
        this.exercicios = result.exercicios;
    }
}

const store = new TarefaStore();
store.load();

export default store;
