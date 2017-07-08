// @flow

import { CollectionService, Constants } from './base';

export default class ChatGroupService extends CollectionService {
  constructor() {
    super(Constants.CHATGROUPS);
  }

  findByAcesso(role: string) {
    return super.search({ role });
  }
}
