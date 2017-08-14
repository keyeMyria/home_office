// @flow

import { CollectionService, Constants } from './../lib/services';

export default class AdministradorService extends CollectionService {
    constructor() {
        super(Constants.ADMINISTRADORES);
    }

    findByNome(nome: string) {
        return super.search({ nome }, 'findByNome');
    }
}
