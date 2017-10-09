// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class MensagemService extends CollectionService {
    constructor() {
        logger.warn('MENSAGENS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.MENSAGENS);
    }
}
