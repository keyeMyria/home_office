// @flow

import { CollectionService, Constants } from './base';

export default class TrabalhoService extends CollectionService {
  constructor() {
    super(Constants.TRABALHOS);
  }

  findByProfessor(id: number) {
    return super.search({ id });
  }
}
