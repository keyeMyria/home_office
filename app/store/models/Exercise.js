// @flow
import { observable, computed, action } from 'mobx';
import type Question from './Question';

export type ExercicioRawData = {
    id: number,
    detalhes: string,
    duracao: number,
    questoes: Array<number>,
};

export default class Exercicio {
    $rootStore: any;

    id: ?number = null;
    @observable detalhes: string = '';
    @observable title: string = '';
    @observable duracao: number = 0;
    @observable _questoes: Array<number> = [];
    respostas: Map<string, number> = observable.map({});

    constructor(rawData: ExercicioRawData, store: any) {
        this.$rootStore = store;
        this.id = rawData.id;
        this.title = rawData.title;
        this.detalhes = rawData.detalhes;
        this.duracao = rawData.duracao;
        this._questoes = rawData.questoes;
    }

    @computed
    get questoes(): Array<Question> {
        return this._questoes.map(key => this.$rootStore.questions.get(String(key)));
    }

    @computed
    get numQuestoes(): number {
        return this._questoes.length;
    }

    /**
     * retorna a duração no formato HH:MM
     */
    @computed
    get duracaoTexto(): string {
        const hours = String(Math.floor(this.duracao / 60));
        const minutes = String(this.duracao % 60);
        return `${`0${hours}`.substr(-2)}:${`0${minutes}`.substr(-2)}`;
    }

    @action.bound
    addResposta(questionID: number | string, respostaID: number) {
        this.respostas.set(String(questionID), respostaID);
    }
}
