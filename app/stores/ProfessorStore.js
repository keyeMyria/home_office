// @flow
import { observable, computed, action } from 'mobx';
import type { ObservableMap } from 'mobx';
import EventEmitter from 'react-native-eventemitter';

import BaseStore from './../lib/BaseStore';
import logger from './../lib/logger';

import ProfessorService from './../services/ProfessorService';
import AnoService from './../services/AnoService';
import DisciplinaService from './../services/DisciplinaService';
import TurmaService from './../services/TurmaService';
import { Professor, Ano, Disciplina, Turma } from './../models';

// Other Stores
import eventoStore from './EventosStore';
import avisoStore from './AvisoStore';

class ProfessorStore extends BaseStore {
    _service = new ProfessorService();
    isDiretor = false;
    @observable id: number;
    @observable loading = false;
    @observable professor: ?Professor;
    @observable anosMap: ObservableMap<Ano> = observable.map({});
    @observable disciplinasMap: ObservableMap<Disciplina> = observable.map({});
    @observable anoSelectedId: number;
    @observable error = false;
    @observable errorMessage = '';

    constructor() {
        super();
        EventEmitter.on('auth.authenticated', ({ userRole, userID }) => {
            if (userRole === 'PROFESSOR') {
                this.fetchProfessor(userID);
            } else if (userRole === 'DIRETOR') {
                this.fetchDiretor(userID);
            }
        });
    }

    async fetchProfessor(id: number) {
        try {
            this.id = id;
            this.loading = true;
            const professor = await this._service.one(this.id).get();
            this.professor = new Professor(professor);
            await this.fetchAnos(id);
            eventoStore.fecthEventosProfessor(id);
            avisoStore.fecthAvisosProfessor(id);
            await this.fetchDisciplinas(id);
            this.loading = false;
        } catch (error) {
            logger.log(error);
            this.error = true;
        }
        return this;
    }

    async fetchDiretor(id: number) {
        try {
            this.id = id;
            this.loading = true;
            this.isDiretor = true;
            await this.fetchAnos(id);
            eventoStore.fecthEventosDiretor(id);
            avisoStore.fecthAvisosDiretor(id);
            await this.fetchDisciplinas(id);
            this.loading = false;
        } catch (error) {
            logger.log(error);
            this.error = true;
        }
        return this;
    }

    async fetchAnos(id: number) {
        let response;
        if (this.isDiretor) {
            response = await new AnoService().get();
        } else {
            response = await new AnoService().findByProfessor(id);
        }
        const anos = Ano.fromArray(response.anos).map(a => [a.id, new Ano(a)]);
        this.anosMap.replace(anos);
        if (this.anosMap.size) {
            this.anoSelectedId = this.anosMap.values()[0].id;
        }
    }

    async fetchDisciplinas(id: number) {
        let response;
        if (this.isDiretor) {
            response = await new DisciplinaService().get();
        } else {
            response = await new DisciplinaService().findByProfessor(id);
        }
        const disciplinas = Disciplina.fromArray(response.disciplinas).map(a => [
            a.id,
            new Disciplina(a),
        ]);
        this.disciplinasMap.replace(disciplinas);
    }

    async fetchTurmas(ano: number, disciplina: number) {
        const service = new TurmaService();
        let response;
        if (this.isDiretor) {
            response = await service.findByAno(ano);
        } else {
            const professor = this.id;
            response = await service.findByAnoAndProfessorAndDisciplina(ano, professor, disciplina);
        }
        return Turma.fromArray(response.turmas);
    }

    @action
    selectAno = (id: number) => {
        this.anoSelectedId = id;
        this.rootStore.eventos.refresh();
    };

    @computed
    get disciplinas(): Array<Disciplina> {
        return this.disciplinasMap.values();
    }

    @computed
    get anos(): Array<Ano> {
        return this.anosMap.values();
    }

    @computed
    get anoSelected(): Ano {
        return this.anosMap.get(this.anoSelectedId);
    }
}

const professorStore = new ProfessorStore();

export default professorStore;
