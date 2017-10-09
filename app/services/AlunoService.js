// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class AlunoService extends CollectionService {
    constructor() {
        logger.warn('ALUNOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.ALUNOS);
    }

    findByAno(id: number) {
        return super.search({ id }, 'findByAno');
    }

    findByTurma(id: number) {
        return super.search({ id }, 'findByTurma');
    }

    findByEvento(id: number) {
        return super.search({ id }, 'findByEvento');
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
