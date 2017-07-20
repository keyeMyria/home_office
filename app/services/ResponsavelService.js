// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ResponsavelService extends CollectionService {
    constructor() {
        super(Constants.RESPONSAVEIS);
    }
}
