// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class EventoService extends CollectionService {
    constructor() {
        logger.warn('EVENTOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.EVENTOS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }

    findByTarefa(id: number) {
        return super.search({ id }, 'findByTarefa');
    }

    findByTarefaAndTurma(tarefa: number, turma: number) {
        return super.search({ tarefa, turma }, 'findByTarefaAndTurma');
    }

    findByAnoAndProfessor(ano: number, professor: number) {
        return super.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    findByTurma(id: number) {
        return super.search({ id }, 'findByTurma');
    }
}
