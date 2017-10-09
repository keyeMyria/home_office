// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class AnoService extends CollectionService {
    constructor() {
        logger.warn('ANOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.ANOS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }

    findByProfessorAndDisciplina(professor: number, disciplina: number) {
        return super.search({ professor, disciplina }, 'findByProfessorAndDisciplina');
    }
}
