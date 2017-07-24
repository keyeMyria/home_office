// @flow

import { observable, extendObservable, action } from 'mobx';
import { TrabalhoService } from '../../services';
import CONFIG from '../../../config';

class TrabalhoStore {
    service: TrabalhoService;
    @observable trabalhos: Array<any>; // TODO: Colocar o model especifico
    @observable errorMessage: string; // TODO: Add computed to show error message

    constructor() {
        this.service = new TrabalhoService();
    }

    async load() {
        const result = await this.service.get();
        this.trabalhos = result.trabalhos;
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

const store = new TrabalhoStore();
store.load();

export default store;
