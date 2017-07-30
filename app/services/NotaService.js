// @flow

import { CollectionService, Constants } from './../lib/services';

export default class NotaService extends CollectionService {
    constructor() {
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
