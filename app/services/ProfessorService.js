// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class ProfessorService extends CollectionService {
    constructor() {
        logger.warn('PROFESSORES -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.PROFESSORES);
    }
}
