// @flow
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { fromPromise } from 'mobx-utils';
import remotedev from 'mobx-remotedev';

import EventoService from './../services/EventoService';
import TarefaService from './../services/TarefaService';

import { Evento, Topico } from './../models';
import type { Aluno } from './../models';

@remotedev({ remote: true })
class EventoStore {
    _service = new EventoService();
    userRole: string;
    @observable loading = true;
    @observable eventosMap: ObservableMap<Evento> = observable.map({});
    @observable error = false;
    @observable selectedEvent: ?Evento;
    @observable selectedEventTopics: any;

    @computed
    get eventos(): Array<Evento> {
        return this.eventosMap.values();
    }

    async fecthEventosAluno(aluno: Aluno) {
        try {
            this.setLoading(true);
            const eventos = await this._service.findByTurma(aluno.turma.id);
            this.setEventos(eventos.eventos);
        } catch (error) {
            console.error(error);
            this.setError(true);
            this.setLoading(false);
        }
    }

    async fecthEventosProfessor(professorId: number) {
        try {
            this.setLoading(true);
            const eventos = await this._service.findByProfessor(professorId);
            this.setEventos(eventos.eventos);
        } catch (error) {
            console.error(error);
            this.setError(true);
        }
    }

    async deleteEvent() {
        if (this.selectedEvent) {
            await this._service.delete(this.selectedEvent.id);
        }
    }

    @action
    setLoading(loading: boolean) {
        this.loading = !!loading;
    }

    @action
    setError(error: boolean) {
        this.error = !!error;
    }

    @action
    setEventos(eventos: Array<Object>) {
        const _eventos: Array<Evento> = Evento.fromSearchArray(eventos);
        // $FlowFixMe
        this.eventosMap.replace(_eventos.map(ev => [ev.id, ev]));
        this.loading = false;
    }

    @action
    selectEvento = (ev: ?Evento): void => {
        this.selectedEvent = ev;
        if (this.selectedEvent) {
            this.selectedEventTopics = fromPromise(
                new TarefaService()
                    .one(this.selectedEvent.tarefa.id)
                    .get()
                    .then(tarefa => tarefa.link.topicos.get())
                    .then(t => t.topicos)
                    .then(t => t.map(m => new Topico(m))),
            );
        }
    };

}

const eventoStore = new EventoStore();

export default eventoStore;
