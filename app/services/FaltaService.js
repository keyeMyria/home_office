// @flow

import { CollectionService, Constants } from './../lib/services';

export default class FaltaService extends CollectionService {
    constructor() {
        super(Constants.FALTAS);
    }

    findByData(data: string) {
        return super.search({ data }, 'findByData');
    }

    findByDisciplinaAndData(id: number, data: string) {
        return super.search({ id, data }, 'findByDisciplinaAndData');
    }
}
