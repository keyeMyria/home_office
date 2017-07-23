// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ResponsabilidadeService extends CollectionService {
    constructor() {
        super(Constants.RESPONSABILIDADES);
    }
}
