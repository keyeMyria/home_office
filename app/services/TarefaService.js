// @flow

import { CollectionService, Constants } from './../lib/services';

export default class TarefaService extends CollectionService {
    constructor() {
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
