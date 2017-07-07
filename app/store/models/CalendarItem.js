// @flow
import { observable, computed } from 'mobx';

export type CalendarItemRawData = {
    id: number,
    titulo: ?string,
    detalhes: ?string,
    pontuacao: ?number,
    bimestre: ?string,
    topicos: Array<string>,
    tempoEstimado: ?number,
    questoes: number,
    data: string,
    horaInicio: ?string,
    horaFim: ?string,
    disciplina: string,
    tipo: string,
    tipoAbreviado: string,
    ano: string,
    turmas: Array<string>,
    cor: string,
};

export default class CalendarItem {
    id: ?number = null;
    @observable titulo: ?string = null;
    @observable detalhes: ?string = null;
    @observable pontuacao: ?number = null;
    @observable bimestre: ?string = null;
    @observable topicos: ?Array<string> = [];
    @observable tempoEstimado: ?number = null;
    @observable questoes: ?number = null;
    @observable data: string = '';
    @observable horaInicio: ?string = null;
    @observable horaFim: ?string = null;
    @observable disciplina: string = '';
    @observable tipo: string = '';
    @observable tipoAbreviado: string = '';
    @observable ano: string = '';
    @observable turmas: Array<string> = [];
    @observable cor: string = 'gray';

    constructor(rawData: CalendarItemRawData) {
        this.id = rawData.id;
        this.titulo = rawData.titulo;
        this.detalhes = rawData.detalhes;
        this.pontuacao = rawData.pontuacao;
        this.bimestre = rawData.bimestre;
        this.topicos = rawData.topicos;
        this.tempoEstimado = rawData.tempoEstimado;
        this.questoes = rawData.questoes;
        this.data = rawData.data;
        this.horaInicio = rawData.horaInicio;
        this.horaFim = rawData.horaFim;
        this.disciplina = rawData.disciplina;
        this.tipo = rawData.tipo;
        this.tipoAbreviado = rawData.tipoAbreviado;
        this.ano = rawData.ano;
        this.turmas = rawData.turmas;
        this.cor = rawData.cor;
    }

    @computed
    get dateObj(): ?Date {
        const timestamp = Date.parse(this.data);
        if (isNaN(timestamp)) return null;
        return new Date(timestamp);
    }

    @computed
    get diaSemanaNumero(): string {
        if (!this.dateObj) return '';
        const day = this.dateObj.getDay();

        // Sábado e Domingo
        if (day === 0 || day === 6) return '';

        return `${day}ª`;
    }

    @computed
    get diaSemanaTexto(): string {
        if (!this.dateObj) return '';

        const daysValues = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        return daysValues[this.dateObj.getDay()];
    }

    @computed
    get dataAbbr(): string {
        if (!this.dateObj) return '';

        const monthValues = [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ];
        const monthName = monthValues[this.dateObj.getMonth()];
        const day = this.dateObj.getDate();
        return `${day}/${monthName}`;
    }

    @computed
    get tipoAndDisciplina(): string {
        return `${this.tipo} de ${this.disciplina}`;
    }
}
