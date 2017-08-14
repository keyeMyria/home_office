// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ProvaService extends CollectionService {
    constructor() {
        super(Constants.PROVAS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
