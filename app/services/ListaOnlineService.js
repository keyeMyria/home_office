// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class ListaOnlineService extends CollectionService {
    constructor() {
        logger.warn('LISTASONLINE -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.LISTASONLINE);
    }
}
