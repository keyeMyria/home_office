// @flow

import { CollectionService, Constants } from './../lib/services';

export default class OcorrenciaService extends CollectionService {
    constructor() {
        super(Constants.OCORRENCIAS);
    }
}
