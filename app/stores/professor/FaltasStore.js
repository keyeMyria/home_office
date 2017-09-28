// @flow
import moment from 'moment';
import { observable, autorun, computed } from 'mobx';
import type { ObservableMap } from 'mobx';

import logger from './../../lib/logger';
import { Aula, Turma, Ano, Aluno, Falta } from '../../models';

class FaltasStore {
    cancelAutorun: () => void;

    @observable avisoTodasAsAulas = false;

    @observable turmasMap: ObservableMap<Turma> = observable.map({});
    @observable aulasMap: ObservableMap<Aula> = observable.map({});
    @observable alunosMap: ObservableMap<Aluno> = observable.map({});

    @observable ano: ?Ano = null;
    @observable turma: ?Turma = null;
    @observable aula: ?Aula = null;
    @observable data = moment().startOf('day');

    lastAno: ?Ano = this.ano;
    lastTurma: ?Turma = this.turma;
    lastAula: ?Aula = this.aula;
    lastData = this.data.day() || 7;

    constructor() {
        this.cancelAutorun = autorun(() => {
            this.fecthTurmas();
            this.fetchAulas();
            this.fecthAlunos();
            if (this.aula !== this.lastAula || this.lastData !== this.data) {
                this.fetchFaltas();
            }
            this.lastAula = this.aula;
            this.lastData = this.data.day() || 7;
        });
    }

    @computed
    get showTurma(): boolean {
        return !!this.turmasMap.entries().length;
    }

    @computed
    get showAula(): boolean {
        return !!this.aulasMap.entries().length;
    }

    reset() {
        this.ano = null;
        this.turma = null;
        this.aula = null;
        this.data = moment().startOf('day');
        this.lastAno = this.ano;
        this.lastTurma = this.turma;
        this.lastAula = this.aula;
        this.lastData = this.data.day() || 7;
        this.turmasMap.clear();
        this.aulasMap.clear();
        this.alunosMap.clear();
    }

    async fecthTurmas() {
        try {
            if (this.ano) {
                if (this.ano === this.lastAno) return;
                // $FlowFixMe
                const turmas = await Turma.findByAnoAndCurrentUser(this.ano.pk);
                this.turmasMap.replace(turmas.map(t => [t.pk, t]));
                this.turma = null;
            }
            this.lastAno = this.ano;
        } catch (error) {
            logger.error(error);
        }
    }

    async fetchAulas() {
        try {
            const dia = this.data.day() || 7;
            if (!this.turma) {
                this.aulasMap.clear();
                this.lastTurma = this.turma;
                return;
            }
            if (this.turma === this.lastTurma && dia === this.lastData) return;
            const aulas = await Aula.findByDiaAndTurma(dia, this.turma.pk);
            this.lastTurma = this.turma;
            this.lastData = dia;
            this.aulasMap.replace(aulas.map(a => [a.pk, a]));
        } catch (error) {
            logger.error(error);
        }
    }

    async fecthAlunos() {
        try {
            if (!this.turma) {
                this.alunosMap.clear();
                this.lastTurma = this.turma;
                return;
            }
            if (this.turma === this.lastTurma) return;
            const alunos = await Aluno.findByTurma(this.turma.pk);
            this.lastTurma = this.turma;
            this.alunosMap.replace(alunos.map(a => [a.pk, a]));
            this.fetchFaltas();
        } catch (error) {
            logger.error(error);
        }
    }

    async fetchFaltas() {
        if (this.ano && this.turma && this.data) {
            const aula = (this.aula && this.aula.pk) || undefined;
            const ano = (this.ano && this.ano.pk) || undefined;
            const turma = (this.turma && this.turma.pk) || undefined;
            const data = this.data && this.data.format('YYYY-MM-DD');
            const idAlunos: Array<number> = await Falta.getAlunos(data, ano, turma, aula);
            logger.warn('', idAlunos);
            this.alunosMap.values().forEach((aluno) => {
                // eslint-disable-next-line no-param-reassign, no-bitwise
                aluno._selected = !!~idAlunos.indexOf(aluno.pk);
            });
        }
    }
}

const faltasStore = new FaltasStore();
export default faltasStore;
