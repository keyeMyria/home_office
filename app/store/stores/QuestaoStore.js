// @flow

import { observable, extendObservable, action } from 'mobx';
import { QuestaoService } from '../../services';

class QuestaoStore {
    service: QuestaoService;
    @observable questoes: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new QuestaoService();
    }

    async load() {
        const result = await this.service.get();
        this.questoes = result.questoes;
    }
}

const store = new QuestaoStore();
store.load();

export default store;
