// @flow

import { observable, extendObservable, action } from 'mobx';
import { ChatService } from '../../services';

class ChatStore {
    service: ChatService;
    @observable chats: Array<any>; // TODO: Colocar o model especifico

    constructor() {
        this.service = new ChatService();
    }

    async load() {
        const result = await this.service.get();
        this.chats = result.chats;
    }
}

const store = new ChatStore();
store.load();

export default store;
