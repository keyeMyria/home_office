// @flow

import { TopicoService } from '../../services';

class TopicoStore {
    service: TopicoService;

    constructor() {
        this.service = new TopicoService();
    }

    getTopicos(disciplina: number, ano: number) {
        return this.service.findByDisciplinaAndAno(disciplina, ano) || [];
    }
}

export default new TopicoStore();
