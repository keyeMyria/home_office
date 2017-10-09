// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class TopicoService extends CollectionService {
    constructor() {
        logger.warn('TOPICOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.TOPICOS);
    }

    findByDisciplinaAndAno(disciplina: number, ano: number) {
        return super.search({ disciplina, ano }, 'findByDisciplinaAndAno');
    }
}
