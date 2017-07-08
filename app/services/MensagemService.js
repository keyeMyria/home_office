// @flow

import { CollectionService, Constants } from './base';

export default class MensagemService extends CollectionService {
  constructor() {
    super(Constants.MENSAGENS);
  }
}
