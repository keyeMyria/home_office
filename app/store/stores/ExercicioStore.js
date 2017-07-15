// @flow

import { observable, extendObservable, action } from 'mobx';
import { ExercicioService } from '../../services';

class ExercicioStore {
    service: ExercicioService;
    @observable exercicios: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ExercicioService();
    }

    async load() {
        const result = await this.service.get();
        this.exercicios = result.exercicios;
    }
}

const store = new ExercicioStore();
store.load();

export default store;
