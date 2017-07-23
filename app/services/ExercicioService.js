// @flow

import { CollectionService, Constants } from './../lib/services';

export default class ExercicioService extends CollectionService {
    constructor() {
        super(Constants.EXERCICIOS);
    }

    findByProfessor(id: number) {
        super.search({ id });
    }
}
