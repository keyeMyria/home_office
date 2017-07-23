// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ListaOnlineService extends CollectionService {
    constructor() {
        super(Constants.LISTASONLINE);
    }
}
