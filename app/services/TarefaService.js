// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class TarefaService extends CollectionService {
    constructor() {
        logger.warn('TAREFAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.TAREFAS);
    }

    findByAnoAndProfessor(ano: number, professor: number) {
        return super.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    findByAnoAndDisciplina(ano: number, disciplina: number) {
        return super.search({ ano, disciplina }, 'findByAnoAndDisciplina');
    }

    findByEvento(evento: number) {
        return super.search({ evento }, 'findByEvento');
    }
}
