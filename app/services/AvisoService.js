// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class AvisoService extends CollectionService {
    constructor() {
        logger.warn('AVISOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.AVISOS);
    }

    findByAluno(id: number, page: number = 0) {
        return super.search({ id, page }, 'findByAluno');
    }

    findByProfessor(id: number, page: number = 0) {
        return super.search({ id, page }, 'findByProfessor');
    }

    findByDiretor(page: number = 0) {
        return super.search({ page }, 'findByDiretor');
    }
}
