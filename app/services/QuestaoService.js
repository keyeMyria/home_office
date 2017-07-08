// @flow

import { CollectionService, Constants } from './base';

export default class QuestaoService extends CollectionService {
  constructor() {
    super(Constants.QUESTOES);
  }
}
