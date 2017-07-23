// @flow
import { observable, computed, action } from 'mobx';
import remotedev from 'mobx-remotedev';
import ProfessorService from './../services/ProfessorService';
import AnoService from './../services/AnoService';
import { Professor, Ano } from './../models';

// Other Stores
import eventoStore from './EventosStore';
import avisoStore from './AvisoStore';

@remotedev({ remote: true })
class ProfessorStore {
    _service = new ProfessorService();
    @observable id: number;
    @observable loading = false;
    @observable professor: ?Professor;
    @observable anos: Array<Ano> = [];
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
        const anos = await new AnoService().findByProfessor(id);
        this.anos = Ano.fromArray(anos.anos);
    }

    @action
    selectAno = (id: number) => {
        const ano = this.anos.find(a => a.id === id);
        if (ano) {
            this.anoSelectedId = id;
            eventoStore.selectAno(id);
        }
    };

    @computed
    get anoSelected(): Ano {
        return this.anos.find(a => a.id === this.anoSelectedId) || this.anos[0];
    }
}

const professorStore = new ProfessorStore();

export default professorStore;
