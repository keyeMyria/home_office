// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class NotaService extends CollectionService {
    constructor() {
        logger.warn('NOTAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.NOTAS);
    }

    findByEvento(id: number) {
        return super.search({ id }, 'findByEvento');
    }

    findByAluno(id: number) {
        return super.search({ id }, 'findByAluno');
    }

    findByAlunoAndTarefa(aluno: number, tarefa: number) {
        return super.search({ aluno, tarefa }, 'findByAlunoAndTarefa');
    }

    findByTurmaAndTarefa(turma: number, tarefa: number) {
        return super.search({ turma, tarefa }, 'findByTurmaAndTarefa');
    }

    findByEventoAndAluno(evento: number, aluno: number) {
        return super.search({ evento, aluno }, 'findByEventoAndAluno');
    }
}
