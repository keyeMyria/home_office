// @flow

import { CollectionService, Constants } from './../lib/services';

export default class UsuarioService extends CollectionService {
    constructor() {
        super(Constants.USUARIOS);
    }

    findByEmailAndPassword(email: string, password: string) {
        return super.search({ email, password });
    }
}
