// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class FaltaService extends CollectionService {
    constructor() {
        logger.warn('FALTAS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.FALTAS);
    }

    findByData(data: string) {
        return super.search({ data }, 'findByData');
    }

    findByDisciplinaAndData(id: number, data: string) {
        return super.search({ id, data }, 'findByDisciplinaAndData');
    }
}
