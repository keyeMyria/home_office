// @flow

import { CollectionService, Constants } from './base';

export default class AlunoService extends CollectionService {
  constructor() {
    super(Constants.ALUNOS);
  }

  findByAno(id: number) {
    return super.search({ id });
  }
}
