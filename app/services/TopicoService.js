// @flow

import { CollectionService, Constants } from './base';

export default class TopicoService extends CollectionService {
  constructor() {
    super(Constants.TOPICOS);
  }

  findByDisciplinaAndAno(disciplina: number, ano: number) {
    return super.search({ disciplina, ano });
  }
}
