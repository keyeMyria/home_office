// @flow

import { observable, extendObservable, action } from 'mobx';
import { UsuarioService } from '../../services';

class UsuarioStore {
    service: UsuarioService;
    @observable administradores: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new UsuarioService();
    }

    async load() {
        const result = await this.service.get();
        this.administradores = result.administradores;
    }
}

const store = new UsuarioStore();
store.load();

export default store;
