// @flow
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { fromPromise } from 'mobx-utils';

import logger from './../lib/logger';
import EventoService from './../services/EventoService';
import TarefaService from './../services/TarefaService';

import { Evento, Topico } from './../models';
import type { Aluno } from './../models';

class EventoStore {
    _service = new EventoService();
    userRole: string;
    @observable loading = true;
    @observable eventosMap: ObservableMap<Evento> = observable.map({});
    @observable error = false;
    @observable selectedEvent: ?Evento;
    @observable selectedEventLancar: ?Evento;
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
            logger.error(error);
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
            logger.error(error);
            this.setError(true);
        }
    }

    async deleteEvent() {
        const event = this.selectedEvent;
        try {
            if (event) {
                await this._service.delete(event.id);
                this.deleteEventAction(event.id);
            }
        } catch (error) {
            logger.error(error);
            this.setError(true);
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

    @action
    deleteEventAction = (id: number): void => {
        this.eventosMap.delete(`${id}`);
    };
}

const eventoStore = new EventoStore();

export default eventoStore;
