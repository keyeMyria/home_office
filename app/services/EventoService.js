// @flow

import { CollectionService, Constants } from './../lib/services';

export default class EventoService extends CollectionService {
    constructor() {
        super(Constants.EVENTOS);
    }

    findByProfessor(id: number) {
        return super.search({ id });
    }

    findByTarefa(id: number) {
        return super.search({ id });
    }

    findByTarefaAndTurma(tarefa: number, turma: number) {
        return super.search({ tarefa, turma });
    }

    findByAnoAndProfessor(ano: number, professor: number) {
        return super.search({ ano, professor });
    }

    findByTurma(id: number) {
        return super.search({ id });
    }

}
