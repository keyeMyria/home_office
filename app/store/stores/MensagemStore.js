// @flow

import { observable, extendObservable, action } from 'mobx';
import { MensagemService } from '../../services';

class MensagemStore {
    service: MensagemService;
    @observable mensagens: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new MensagemService();
    }

    async load() {
        const result = await this.service.get();
        this.mensagens = result.mensagens;
    }
}

const store = new MensagemStore();
store.load();

export default store;
