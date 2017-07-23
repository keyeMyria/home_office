// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ListaGeradaService extends CollectionService {
    constructor() {
        super(Constants.LISTASGERADAS);
    }
}
