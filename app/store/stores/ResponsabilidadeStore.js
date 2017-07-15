// @flow

import { observable, extendObservable, action } from 'mobx';
import { ResponsabilidadeService } from '../../services';

class ResponsabilidadeStore {
    service: ResponsabilidadeService;
    @observable responsabilidades: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ResponsabilidadeService();
    }

    async load() {
        const result = await this.service.get();
        this.responsabilidades = result.responsabilidades;
    }
}

const store = new ResponsabilidadeStore();
store.load();

export default store;
