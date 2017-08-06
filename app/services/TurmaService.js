// @flow

import { CollectionService, Constants } from './../lib/services';

export default class TurmaService extends CollectionService {
    constructor() {
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
}
