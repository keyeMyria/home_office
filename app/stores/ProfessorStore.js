// @flow
import { observable, computed, action } from 'mobx';
import type { ObservableMap } from 'mobx';

import ProfessorService from './../services/ProfessorService';
import AnoService from './../services/AnoService';
import TurmaService from './../services/TurmaService';
import { Professor, Ano, Disciplina, Turma } from './../models';

// Other Stores
import eventoStore from './EventosStore';
import avisoStore from './AvisoStore';

class ProfessorStore {
    _service = new ProfessorService();
    @observable id: number;
    @observable loading = false;
    @observable professor: ?Professor;
    @observable anosMap: ObservableMap<Ano> = observable.map({});
    @observable disciplinasMap: ObservableMap<Disciplina> = observable.map({});
    @observable anoSelectedId: number;
    @observable error = false;
    @observable errorMessage = '';

    async fetchProfessor(id: number) {
        try {
            this.id = id;
            this.loading = true;
            const professor = await this._service.one(this.id).get();
            this.professor = new Professor(professor);
            eventoStore.fecthEventosProfessor(id);
            avisoStore.fecthAvisosProfessor(id);
            await this.fetchAnos(id);
            await this.fetchDisciplinas(id);
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

    async fetchAnos(id: number) {
        const response = await new AnoService().findByProfessor(id);
        const anos = Ano.fromArray(response.anos).map(a => [a.id, new Ano(a)]);
        this.anosMap.replace(anos);
        const fisrtAnoID = this.anosMap.keys()[0];
        if (!this.anoSelectedId && fisrtAnoID) {
            this.anoSelectedId = parseInt(fisrtAnoID, 10);
        }
    }

    async fetchDisciplinas(id: number) {
        const response = await this._service.one(id).all('disciplinas').get();
        const disciplinas = Disciplina.fromArray(response.disciplinas).map(a => [
            a.id,
            new Disciplina(a),
        ]);
        this.disciplinasMap.replace(disciplinas);
    }

    async fetchTurmas(ano: number, disciplina: number) {
        const service = new TurmaService();
        const professor = this.id;
        const resp = await service.findByAnoAndProfessorAndDisciplina(ano, professor, disciplina);
        return Turma.fromArray(resp.turmas);
    }

    @action
    selectAno = (id: number) => {
        this.anoSelectedId = id;
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
