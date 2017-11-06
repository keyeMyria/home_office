// @flow
import { AppState } from 'react-native';
import { observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';
import moment from 'moment';

import BaseStore from './../lib/BaseStore';

import logger from './../lib/logger';

import { Evento, Tarefa } from './../models';
import type { Aluno } from './../models';

class EventoStore extends BaseStore {
    userRole: string;
    aluno: ?Aluno;
    professorId: ?number;
    appState: string = AppState.currentState || '';
    @observable currentWeek = moment().week();
    @observable prevWeek: number = 0;
    @observable loading = true;
    @observable refreshIndicator = false;
    @observable eventos: Array<any> = observable.shallowArray();
    @observable prevEventosLenght: number = 0;
    @observable error = false;
    @observable selectedEvent: ?number;
    @observable selectedEventLancar: ?Evento;
    @observable selectedTarefa: any;

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

    @action
    setEventos(newEventos: any, nextWeek: number, refresh: boolean = false) {
        if (refresh) {
            // $FlowFixMe
            this.eventos.replace(newEventos);
            this.prevEventosLenght = 0;
        } else if (this.eventos.length === 0 || nextWeek >= this.currentWeek) {
            this.prevEventosLenght = this.eventos.length;
            this.eventos.push(...newEventos);
        } else {
            this.prevEventosLenght = this.eventos.length;
            this.eventos.unshift(...newEventos);
        }
        this.prevWeek = this.currentWeek;
        this.currentWeek = nextWeek;
        this.loading = false;
        this.refreshIndicator = false;
        this.error = true;
    }

    async fetchEventos(week?: number, refresh: boolean = false, refreshIndicator: boolean = false) {
        try {
            const hasAno = this.rootStore.user.canAddActivity;
            const nextWeek = week || this.currentWeek;
            const ano = hasAno ? this.rootStore.professor.anoSelectedId : undefined;
            const aluno = this.aluno ? this.aluno.id : undefined;
            if (refreshIndicator) {
                this.refreshIndicator = true;
            } else {
                this.loading = true;
            }
            const newEventos = await Evento.mine(nextWeek, ano, aluno);
            this.setEventos(newEventos, nextWeek, refresh);
        } catch (error) {
            logger.error(error);
            this.loading = false;
            this.error = true;
        }
    }

    fecthEventosAluno(aluno: Aluno) {
        this.aluno = aluno;
        this.userRole = 'ALUNO';
        return this.refresh();
    }

    fecthEventosProfessor(professorId: number) {
        this.professorId = professorId;
        this.userRole = 'PROFESSOR';
        return this.refresh();
    }

    fecthEventosDiretor() {
        this.userRole = 'DIRETOR';
        return this.refresh();
    }

    @action
    refresh() {
        this.fetchEventos(moment().week(), true);
    }

    async deleteEvent() {
        const tarefa = this.selectedTarefa.value;
        try {
            if (tarefa && tarefa.id) {
                await tarefa.delete();
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
    selectEvento = (ev: ?any): void => {
        this.selectedEvent = ev ? ev.id : 0;
        if (ev) {
            this.selectedTarefa = fromPromise(Tarefa.getOne(ev.id_tarefa));
        }
    };
}

const eventoStore = new EventoStore();

export default eventoStore;
