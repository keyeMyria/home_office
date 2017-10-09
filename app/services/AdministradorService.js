// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED', __filename);

export default class AdministradorService extends CollectionService {
    constructor() {
        logger.warn('ADMINISTRADORES -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.ADMINISTRADORES);
    }

    findByNome(nome: string) {
        return super.search({ nome }, 'findByNome');
    }
}
