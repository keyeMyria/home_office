// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class ProvaService extends CollectionService {
    constructor() {
        logger.warn('PROVAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.PROVAS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
