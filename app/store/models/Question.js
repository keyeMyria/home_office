// @flow
import { observable, computed, action } from 'mobx';

export type QuestionRawData = {
    id: number,
    allText: string,
    enunciado: ?string,
    imagem: ?string,
    respostaCerta: number,
    respostas: Array<string>,
    texto: ?string,
};

export default class Question {
    id: ?number = null;
    @observable allText: ?string = null;
    @observable enunciado: ?string = null;
    @observable imagem: ?string = null;
    @observable respostaCerta: ?number = null;
    @observable respostas: Array<string> = [];
    @observable respostaMarcada: ?number = null;
    @observable texto: ?string = null;

    constructor(rawData: QuestionRawData) {
        this.id = rawData.id;
        this.allText = rawData.allText;
        this.enunciado = rawData.enunciado;
        this.id = rawData.id;
        this.imagem = rawData.imagem;
        this.respostaCerta = rawData.respostaCerta;
        this.respostas = rawData.respostas;
        this.texto = rawData.texto;
    }

    @computed
    get itemCorreto(): string {
        if (!this.respostaCerta) return '';
        return this.respostas[this.respostaCerta];
    }

    @action
    marcarResposta(index: number) {
        this.respostaMarcada = index;
    }
}
