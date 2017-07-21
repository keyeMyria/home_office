import { observable, action, computed, autorun } from 'mobx';
import AlunoService from './../services/AlunoService';
import EventoService from './../services/EventoService';
import AvisoService from './../services/AvisoService';
import { Aluno, Evento, Aviso } from './../models';
import type { Nota } from './../models';

// Other Stores
import eventoStore from './EventosStore';
import avisoStore from './AvisoStore';

class AlunoStore {
    _service = new AlunoService();
    @observable id: ?number;
    @observable loading = false;
    @observable aluno: ?Aluno;
    @observable notas = [];
    @observable avisos = [];
    @observable error = false;

    async fetchAluno(id) {
        try {
            this.id = id;
            this.loading = true;
            const aluno = await this._service.one(this.id).get();
            this.aluno = new Aluno(aluno);
            eventoStore.fecthEventosAluno(this.aluno);
            avisoStore.fecthAvisosAluno(this.id);
            this.notas = await this.fecthNotas();
            this.loading = false;
        } catch (error) {
            console.error(error);
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
