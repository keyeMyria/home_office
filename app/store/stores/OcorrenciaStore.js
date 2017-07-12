// @flow

import { observable, extendObservable, action } from 'mobx';
import { OcorrenciaService } from '../../services';

class OcorrenciaStore {
    service: OcorrenciaService;
    @observable ocorrencias: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new OcorrenciaService();
    }

    async load() {
        const result = await this.service.get();
        this.ocorrencias = result.ocorrencias;
    }
}

const store = new OcorrenciaStore();
store.load();

export default store;
