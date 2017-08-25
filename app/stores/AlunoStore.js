// @flow
import { observable } from 'mobx';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';

import AlunoService from './../services/AlunoService';
import { Aluno, Turma } from './../models';

// Other Stores
import eventoStore from './EventosStore';
import avisoStore from './AvisoStore';

class AlunoStore extends BaseStore {
    _service = new AlunoService();
    @observable id: number;
    @observable loading = false;
    @observable aluno: ?Aluno;
    @observable notas = [];
    @observable avisos = [];
    @observable error = false;

    constructor() {
        super();
        EventEmitter.on('auth.authenticated', ({ userRole, userID }) => {
            if (userRole === 'ALUNO') {
                this.fetchAluno(userID);
            }
        });
    }

    async fetchAluno(id: number) {
        try {
            this.id = id;
            this.loading = true;
            const aluno = await this._service.one(this.id).get();
            this.aluno = new Aluno(aluno);
            const turma = await this._service.one(this.id).all('turma').get();
            this.aluno.turma = new Turma(turma);
            eventoStore.fecthEventosAluno(this.aluno);
            avisoStore.fecthAvisosAluno(this.id);
            this.notas = await this.fecthNotas();
            this.loading = false;
        } catch (error) {
            // eslint-disable-next-line no-undef
            if (__DEV__) {
                console.error(error); // eslint-disable-line no-console
            }
            this.error = true;
        }
        return this;
    }

    async setAluno(aluno: Aluno) {
        try {
            this.loading = true;
            this.id = aluno.id;
            this.aluno = aluno;
            eventoStore.fecthEventosAluno(this.aluno);
            avisoStore.fecthAvisosAluno(this.id);
            this.notas = await this.fecthNotas();
            this.loading = false;
        } catch (error) {
            // eslint-disable-next-line no-undef
            if (__DEV__) {
                console.error(error); // eslint-disable-line no-console
            }
            this.error = true;
        }
        return this;
    }

    async fecthNotas() {
        const notas = await this._service.one(this.id).all('notas/resumo').get();
        return notas.historicoResumidoes;
    }
}

const alunoStore = new AlunoStore();

export default alunoStore;
