// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class ChatService extends CollectionService {
    constructor() {
        logger.warn('CHATS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.CHATS);
    }

    findConversation(u1: number, u2: number) {
        return super.search({ u1, u2 }, 'findConversation');
    }
}
