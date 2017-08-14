// @flow

import { CollectionService, Constants } from './../lib/services';

export default class TrabalhoService extends CollectionService {
    constructor() {
        super(Constants.TRABALHOS);
    }

    findByProfessor(id: number) {
        return super.search({ id }, 'findByProfessor');
    }
}
