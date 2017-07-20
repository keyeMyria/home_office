// @flow

import { CollectionService, Constants } from './../lib/services';

export default class AnoService extends CollectionService {
    constructor() {
        super(Constants.ANOS);
    }

    findByProfessor(id: number) {
        return super.search({ id });
    }

    findByProfessorAndDisciplina(professor: number, disciplina: number) {
        return super.search({ professor, disciplina });
    }
}
