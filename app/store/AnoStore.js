// @flow

import { observable, extendObservable, action } from 'mobx';

import { AnoService } from '../services';

class Ano {
    id: ?number;
    abreviacao: string;
    titulo: string;
    disciplinas: Array<Disciplina>;
    turmas: Array<Turma>;
    topicos: Array<Topico>;
    tarefas: Array<Tarefa>;
}

class AnoStore {
    service: AnoService;
    @observable anos: Array<Ano>;

    constructor() {
        this.service = new AnoService();
    }

    async getAll() {
        const result = await this.service.get();
        this.anos = result.anos;
    }
}

const store = new AnoStore();
store.getAll();

export default store;
