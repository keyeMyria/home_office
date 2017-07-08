// @flow

import { CollectionService, Constants } from './base';

export default class ChatService extends CollectionService {
  constructor() {
    super(Constants.CHATS);
  }

  findConversation(u1: number, u2: number) {
    return super.search({ u1, u2 });
  }
}
