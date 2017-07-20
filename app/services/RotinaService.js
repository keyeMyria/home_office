// @flow

import { CollectionService, Constants } from './../lib/services';

export default class RotinaService extends CollectionService {
    constructor() {
        super(Constants.ROTINAS);
    }
}
