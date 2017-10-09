// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class TurmaService extends CollectionService {
    constructor() {
        logger.warn('TURMAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.TURMAS);
    }

    findByAnoAndProfessorAndDisciplina(ano: number, professor: number, disciplina: number) {
        return super.search({ ano, professor, disciplina }, 'findByAnoAndProfessorAndDisciplina');
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }

    findByAnoAndProfessor(ano: number, professor: number) {
        return super.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    findByAno(id: number) {
        return super.search({ id }, 'findByAno');
    }
}
