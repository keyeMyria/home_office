// @flow

import { CollectionService, Constants } from './../lib/services';

export default class QuestaoService extends CollectionService {
    constructor() {
        super(Constants.QUESTOES);
    }
}
