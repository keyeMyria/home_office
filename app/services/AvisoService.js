// @flow

import { CollectionService, Constants } from './base';

export default class AvisoService extends CollectionService {
  constructor() {
    super(Constants.AVISOS);
  }
}
