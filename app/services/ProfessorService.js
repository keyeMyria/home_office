// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ProfessorService extends CollectionService {
    constructor() {
        super(Constants.PROFESSORES);
    }
}
