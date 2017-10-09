// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class DisciplinaService extends CollectionService {
    constructor() {
        logger.warn('DISCIPLINAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.DISCIPLINAS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
