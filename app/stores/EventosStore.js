// @flow
import { AppState } from 'react-native';
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { fromPromise } from 'mobx-utils';

import BaseStore from './../lib/BaseStore';

import logger from './../lib/logger';
import EventoService from './../services/EventoService';
import TarefaService from './../services/TarefaService';

import { Evento, Tarefa } from './../models';
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
    @observable selectedEventTarefa: any;

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

    async fetchEventos({ aluno, professorId }: {aluno?: Aluno, professorId?: number | string}) {
        try {
            this.setLoading(true);
            let eventos;
            if (aluno || this.userRole === 'ALUNO') {
                eventos = await Evento.findByTurma(aluno.turma.id || this.aluno.turma.id);
            } else if (professorId || this.userRole === 'PROFESSOR') {
                eventos = await Evento.findByProfessor(professorId || this.professorId);
            } else {
                eventos = await Evento.all();
            }
            this.setEventos(eventos);
        } catch (error) {
            logger.error(error);
            this.setLoading(false);
            this.setError(true);
        }
    }

    fecthEventosAluno(aluno: Aluno) {
        this.aluno = aluno;
        this.userRole = 'ALUNO';
        return this.fetchEventos({ aluno });
    }

    fecthEventosProfessor(professorId: number) {
        this.professorId = professorId;
        this.userRole = 'PROFESSOR';
        return this.fetchEventos({ professorId });
    }

    fecthEventosDiretor() {
        this.userRole = 'DIRETOR';
        this.fetchEventos({});
    }

    @action
    refresh() {
        this.fetchEventos();
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
        this.eventosMap.replace(eventos.map(ev => [ev.id, ev]));
        this.loading = false;
    }

    @action
    selectEvento = (ev: ?Evento): void => {
        this.selectedEvent = ev;
        if (this.selectedEvent) {
            this.selectedEventTarefa = fromPromise(Tarefa.getOne(this.selectedEvent.tarefa.id));
        }
    };

    @action
    deleteEventAction = (id: number): void => {
        this.eventosMap.delete(`${id}`);
    };
}

const eventoStore = new EventoStore();

export default eventoStore;
