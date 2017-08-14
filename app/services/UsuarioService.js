// @flow

import { CollectionService, Constants } from './../lib/services';

export default class UsuarioService extends CollectionService {
    constructor() {
        super(Constants.USUARIOS);
    }
}
