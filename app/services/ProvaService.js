// @flow

import { CollectionService, Constants } from './base';

export default class ProvaService extends CollectionService {
  constructor() {
    super(Constants.PROVAS);
  }

  findByProfessor(id: number) {
    return super.search({ id });
  }
}
