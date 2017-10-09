// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class ResponsavelService extends CollectionService {
    constructor() {
        logger.warn('RESPONSAVEIS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.RESPONSAVEIS);
    }
}
