// @flow
import { AppState } from 'react-native';
import { observable, action, computed } from 'mobx';
import type { ObservableMap } from 'mobx';
import { fromPromise } from 'mobx-utils';
import moment from 'moment';
import _ from 'lodash';

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

    async fetchEventos({ aluno, professorId }: { aluno?: Aluno, professorId?: number | string }) {
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
        this.fetchEventos({});
    }

    @action
    addEventos(eventos: Array<Evento>): void {
        // $FlowFixMe
        this.eventosMap.merge(eventos.map(ev => [ev.id, ev]));
    }

    @computed
    get eventosSections(): any {
        const startOfThisWeek = moment()
            .startOf('week')
            .valueOf();
        const startOfNextWeek = moment()
            .add(1, 'weeks')
            .startOf('week')
            .valueOf();
        const endOfNextWeek = moment()
            .add(1, 'weeks')
            .endOf('week')
            .valueOf();

        const eventosGroup = _.groupBy(this.eventos, (ev) => {
            if (
                this.rootStore.user.canAddActivity &&
                this.rootStore.professor.anoSelectedId &&
                ev.turma.ano.id !== this.rootStore.professor.anoSelectedId
            ) {
                return 'oculto';
            }
            const date = new Date(ev.fim).getTime();
            if (date < startOfThisWeek) return 'semanasAnteriores';
            if (date < startOfNextWeek) return 'semanaAtual';
            if (date < endOfNextWeek) return 'proximaSemana';
            return 'proximasSemanas';
        });
        const sections = [];
        if (this.rootStore.user.canAddActivity && eventosGroup.semanasAnteriores) {
            sections.push({
                data: eventosGroup.semanasAnteriores,
                title: 'Semanas Anteriores',
            });
        }
        if (eventosGroup.semanaAtual) {
            sections.push({
                data: eventosGroup.semanaAtual,
                title: 'Semana Atual',
            });
        }
        if (eventosGroup.proximaSemana) {
            sections.push({
                data: eventosGroup.proximaSemana,
                title: 'Próxima semana',
            });
        }
        return sections;
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
