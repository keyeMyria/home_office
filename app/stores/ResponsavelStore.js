// @flow
import { observable, computed } from 'mobx';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';
import logger from './../lib/logger';

import ResponsavelService from './../services/ResponsavelService';
import { Aluno, Responsavel } from './../models';

// Other Stores
import alunoStore from './AlunoStore';

class ResponsavelStore extends BaseStore {
    _service = new ResponsavelService();
    @observable id: ?number;
    @observable loading = true;
    @observable responsavel: ?Responsavel;
    @observable alunos: Array<Aluno> = [];
    @observable alunoSelectedId: number;
    @observable error = false;

    constructor() {
        super();
        EventEmitter.on('auth.authenticated', ({ userRole, userID }) => {
            if (userRole === 'RESPONSAVEL') {
                this.fetchResponsavel(userID);
            }
        });
    }

    async fetchResponsavel(id: number) {
        try {
            this.id = id;
            this.loading = true;
            const responsavel = await this._service.one(this.id).get();
            this.responsavel = responsavel;
            this.alunos = responsavel.alunos.map(a => new Aluno(a));
            if (this.alunos.length) {
                alunoStore.setAluno(this.alunos[0]);
            }
            this.loading = false;
        } catch (error) {
            logger.warn(error);
            this.error = true;
        }
        return this;
    }

    selectAluno(id: number) {
        if (this.alunoSelectedId === id) return;
        const aluno = this.alunos.find(a => a.id === id);
        if (aluno) {
            alunoStore.loading = true;
            this.alunoSelectedId = id;
            alunoStore.setAluno(aluno);
        } else {
            logger.error(`Student with id ${id} not found in responsavelStore`);
        }
    }

    @computed
    get alunoSelected(): Aluno {
        return this.alunos.find(a => a.id === this.alunoSelectedId) || this.alunos[0];
    }
}

const responsavelStore = new ResponsavelStore();

export default responsavelStore;
