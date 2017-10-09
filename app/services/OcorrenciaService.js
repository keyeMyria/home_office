// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class OcorrenciaService extends CollectionService {
    constructor() {
        logger.warn('OCORRENCIAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.OCORRENCIAS);
    }
}
