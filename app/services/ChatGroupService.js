// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class ChatGroupService extends CollectionService {
    constructor() {
        logger.warn('CHATGROUPS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.CHATGROUPS);
    }

    findByAcesso(role: string) {
        return super.search({ role }, 'findByAcesso');
    }
}
