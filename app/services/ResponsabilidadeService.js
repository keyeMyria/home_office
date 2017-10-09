// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class ResponsabilidadeService extends CollectionService {
    constructor() {
        logger.warn('RESPONSABILIDADES -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.RESPONSABILIDADES);
    }
}
