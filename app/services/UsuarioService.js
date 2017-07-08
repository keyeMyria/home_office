// @flow

import { CollectionService, Constants } from './base';

export default class UsuarioService extends CollectionService {
  constructor() {
    super(Constants.USUARIOS);
  }

  findByEmailAndPassword(email: string, password: string) {
    return super.search({ email, password });
  }
}
