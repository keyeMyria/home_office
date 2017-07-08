// @flow

import { CollectionService, Constants } from './base';

export default class ListaOnlineService extends CollectionService {
  constructor() {
    super(Constants.LISTASONLINE);
  }
}
