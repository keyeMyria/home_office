// @flow

import { CollectionService, Constants } from './../lib/services';

export default class AvisoService extends CollectionService {
    constructor() {
        super(Constants.AVISOS);
    }

    findByAluno(id: number, page: number = 0) {
        return super.search({ id, page }, 'findByAluno');
    }

    findByProfessor(id: number, page: number = 0) {
        return super.search({ id, page }, 'findByProfessor');
    }

<<<<<<< HEAD
    findByDiretor(page: number = 0) {
        return super.search({ page }, 'findByDiretor');
=======
    findByDiretor() {
        return super.search({}, 'findByDiretor');
>>>>>>> Fix for DIRETOR user role
    }
}
