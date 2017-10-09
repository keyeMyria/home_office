// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class ExercicioService extends CollectionService {
    constructor() {
        logger.warn('EXERCICIOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.EXERCICIOS);
    }

    findByProfessor(id: number) {
        super.search({ id }, 'findByProfessor');
    }
}
