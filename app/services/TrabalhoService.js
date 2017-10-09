// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class TrabalhoService extends CollectionService {
    constructor() {
        logger.warn('TRABALHOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.TRABALHOS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
