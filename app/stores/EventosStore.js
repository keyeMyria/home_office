// @flow
import { AppState } from 'react-native';
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { fromPromise } from 'mobx-utils';

import BaseStore from './../lib/BaseStore';

import logger from './../lib/logger';
import EventoService from './../services/EventoService';
import TarefaService from './../services/TarefaService';

import { Evento, Topico } from './../models';
import type { Aluno } from './../models';

class EventoStore extends BaseStore {
    _service = new EventoService();
    userRole: string;
    aluno: ?Aluno;
    professorId: ?number;
    appState: string = AppState.currentState || '';
    @observable loading = true;
    @observable eventosMap: ObservableMap<Evento> = observable.map({});
    @observable error = false;
    @observable selectedEvent: ?Evento;
    @observable selectedEventLancar: ?Evento;
    @observable selectedEventTopics: any;

    constructor() {
        super();
        const handleAppStateChange = (nextAppState) => {
            if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
                this.refresh();
            }
            this.appState = nextAppState;
        };
        AppState.addEventListener('change', handleAppStateChange);
    }

    @computed
    get eventos(): Array<Evento> {
        return this.eventosMap.values();
    }

    async fecthEventosAluno(aluno: Aluno) {
        try {
            this.aluno = aluno;
            this.userRole = 'ALUNO';
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
            this.professorId = professorId;
            this.userRole = 'PROFESSOR';
            this.setLoading(true);
            const eventos = await this._service.findByProfessor(professorId);
            this.setEventos(eventos.eventos);
        } catch (error) {
            logger.error(error);
            this.setError(true);
            this.setLoading(false);
        }
    }

    async fecthEventosDiretor() {
        try {
            this.userRole = 'PROFESSOR';
            this.setLoading(true);
            const eventos = await this._service.get();
            this.setEventos(eventos.eventos);
        } catch (error) {
            logger.error(error);
            this.setError(true);
            this.setLoading(false);
        }
    }

    refresh() {
        switch (this.userRole) {
        case 'ALUNO':
            if (this.aluno) {
                this.fecthEventosAluno(this.aluno);
            }

            break;
        case 'PROFESSOR':
            if (this.professorId) {
                this.fecthEventosProfessor(this.professorId);
            }
            break;
        default:
            break;
        }
    }

    async deleteEvent() {
        const event = this.selectedEvent;
        try {
            if (event && event.tarefa && event.tarefa.id) {
                await new TarefaService().delete(event.tarefa.id);
                this.refresh();
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
