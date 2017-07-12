// @flow

import { observable, extendObservable, action } from 'mobx';
import { EventoService } from '../../services';

class EventoStore {
    service: EventoService;
    @observable eventos: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new EventoService();
    }

    async load() {
        const result = await this.service.get();
        this.eventos = result.eventos;
    }
}

const store = new EventoStore();
store.load();

export default store;
