// @flow

import { CollectionService, Constants } from './base';

export default class TarefaService extends CollectionService {
  constructor() {
    super(Constants.TAREFAS);
  }

  findByAnoAndProfessor(ano: number, professor: number) {
    return super.search({ ano, professor });
  }

  findByAnoAndDisciplina(ano: number, disciplina: number) {
    return super.search({ ano, disciplina });
  }
}
