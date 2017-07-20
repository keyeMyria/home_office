// @flow

import { CollectionService, Constants } from './../lib/services';

export default class MensagemService extends CollectionService {
    constructor() {
        super(Constants.MENSAGENS);
    }
}
