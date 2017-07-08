// @flow

import { CollectionService, Constants } from './base';

export default class ExercicioService extends CollectionService {
  constructor() {
    super(Constants.EXERCICIOS);
  }

  findByProfessor(id: number) {
    super.search({ id });
  }
}
