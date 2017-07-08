// @flow

import { CollectionService, Constants } from './base';

export default class ProfessorService extends CollectionService {
  constructor() {
    super(Constants.PROFESSORES);
  }
}
