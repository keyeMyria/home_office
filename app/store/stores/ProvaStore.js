// @flow

import { observable, extendObservable, action } from 'mobx';
import { ProvaService } from '../../services';
import CONFIG from './../../../config';

class ProvaStore {
    service: ProvaService;
    @observable provas: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ProvaService();
    }

    async load() {
        const result = await this.service.get();
        this.provas = result.provas;
    }

    async save(data: Object) {
        const readyData = {
            ...data,
            disciplina: `${CONFIG.API.BASE_URL}/disciplinas/${data.disciplina}`,
            titulo: 'Teste',
        };
        const result = await this.service.post(readyData);
        if (__DEV__) console.log(result); // eslint-disable-line
    }
}

const store = new ProvaStore();
store.load();

export default store;
