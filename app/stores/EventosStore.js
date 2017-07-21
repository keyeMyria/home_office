// @flow
import { observable, action, computed, autorun, when } from 'mobx';
import type { ObservableMap } from 'mobx';
import EventoService from './../services/EventoService';
import TarefaService from './../services/TarefaService';
import { Evento } from './../models';
import type { Aluno } from './../models';

// import userStore from './UserStore';
// import alunoStore from './AlunoStore';

class EventoStore {
    _service = new EventoService();
    userRole: string;
    @observable loading = false;
    @observable eventosMap: ObservableMap<Evento> = observable.map({});
    @observable error = false;
    @observable selectedEvent: ?Evento;

    /**
   * Populate the store with the events for the aluno
   */
    async fecthEventosAluno(aluno: Aluno) {
        try {
            this.loading = true;
            const eventos = await this._service.findByTurma(aluno.turma.id);
            this.setEventos(eventos.eventos);
        } catch (error) {
            console.error(error);
            this.error = true;
        }
    }

    /**
   * Populate the store with the events for the professor
   */
    async fecthEventosProfessor(professorId: number) {
        // try {
        //   this.loading = true;
        //   const eventos = await this._service.findByTurma(aluno.turma.id);
        //   this.setEventos(eventos.eventos);
        // } catch (error) {
        //   console.error(error);
        //   this.error = true;
        // }
    }

    @action
    setEventos(eventos: Array<any>) {
        this.eventosMap.replace(new Evento(eventos).map(ev => [ev.id, ev]));
        this.loading = false;
    }

    selectEvento = (ev: ?Evento): void => {
        this.selectedEvent = ev;
    };

    @computed
    selectedEventTopics(): Promise<[]> {
        if (!this.selectedEvent) return Promise.resolve([]);

        return new TarefaService()
            .one(this.selectedEvent.tarefa.id)
            .get()
            .then(tarefa => tarefa.link.topicos.get());
    }

    @computed
    get eventos(): Array<Evento> {
        return this.eventosMap.values();
    }
}

const eventoStore = new EventoStore();

export default eventoStore;
