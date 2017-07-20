// @flow

import { CollectionService, Constants } from './../lib/services';

export default class AlunoService extends CollectionService {
    constructor() {
        super(Constants.ALUNOS);
    }

    findByAno(id: number) {
        return super.search({ id }, 'findByAno');
    }
}
