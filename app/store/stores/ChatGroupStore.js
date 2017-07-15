// @flow

import { observable, extendObservable, action } from 'mobx';
import { ChatGroupService } from '../../services';

class ChatGroupStore {
    service: ChatGroupService;
    @observable chatGroups: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ChatGroupService();
    }

    async load() {
        const result = await this.service.get();
        this.chatGroups = result.chatGroups;
    }
}

const store = new ChatGroupStore();
store.load();

export default store;
