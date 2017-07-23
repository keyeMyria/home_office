// @flow

import { CollectionService, Constants } from './../lib/services';

export default class DisciplinaService extends CollectionService {
    constructor() {
        super(Constants.DISCIPLINAS);
    }
}
