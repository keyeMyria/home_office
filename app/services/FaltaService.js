// @flow

import { CollectionService, Constants } from './../lib/services';

export default class FaltaService extends CollectionService {
    constructor() {
        super(Constants.FALTAS);
    }

    findByData(data: Date) {
        return super.search({ data });
    }
}
