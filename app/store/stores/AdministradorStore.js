// @flow

import { observable, extendObservable, action } from 'mobx';
import { AdministradorService } from '../../services';

class AdministradorStore {
    service: AdministradorService;
    @observable administradores: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new AdministradorService();
    }

    async load() {
        const result = await this.service.get();
        this.administradores = result.administradores;
    }
}

const store = new AdministradorStore();
store.load();

export default store;
