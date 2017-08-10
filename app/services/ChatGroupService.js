// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ChatGroupService extends CollectionService {
    constructor() {
        super(Constants.CHATGROUPS);
    }

    findByAcesso(role: string) {
        return super.search({ role }, 'findByAcesso');
    }
}
