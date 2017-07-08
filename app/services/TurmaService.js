// @flow

import { CollectionService, Constants } from './base';

export default class TurmaService extends CollectionService {
  constructor() {
    super(Constants.TURMAS);
  }

  findByAnoAndProfessorAndDisciplina(ano: number, professor: number, disciplina: number) {
    return super.search({ ano, professor, disciplina });
  }

  findByProfessor(id: number) {
    return super.search({ id });
  }

  findByAnoAndProfessor(ano: number, professor: number) {
    return super.search({ ano, professor });
  }
}
