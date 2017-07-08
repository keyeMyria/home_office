// @flow

import { CollectionService, Constants } from './base';

export default class AdministradorService extends CollectionService {
  constructor() {
    super(Constants.ADMINISTRADORES);
  }

  findByNome(nome: string) {
    return super.search({ nome });
  }
}
