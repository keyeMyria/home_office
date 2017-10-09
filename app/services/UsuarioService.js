// @flow

import { CollectionService, Constants } from './../lib/services';
import logger from './../lib/logger';

logger.warn('Services is DEPRECATED');

export default class UsuarioService extends CollectionService {
    constructor() {
        logger.warn('USUARIOS -> Uso de services está depreciado, use os métodos estáticos nos models');
        super(Constants.USUARIOS);
    }
}
