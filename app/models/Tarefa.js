// @flow
import * as models from './../lib/models';
import { CollectionService } from './../lib/services';
import type Evento from './Evento';
import type Nota from './Nota';
import type Disciplina from './Disciplina';
import type Topico from './Topico';
import type Ano from './Ano';

import CONFIG from '../../config';

const TIPOS = {
    TRABALHO: 'TRABALHO',
    PROVA: 'PROVA',
    EXERCICIO: 'EXERCICIO',
    LISTA_ONLINE: 'LISTA_ONLINE',
};

type TipoTarefa = $Keys<typeof TIPOS>;

@models.register('Tarefa', {
    id: models.PrimaryKey(),
    titulo: models.String(),
    tipo: models.String(),
    valor: models.Integer(),
    bimestre: models.Integer(),
    detalhes: models.String(),
    duracao: models.Integer(),
    eventos: models.OneToMany('Evento'),
    notas: models.ManyToMany('Nota'),
    disciplina: models.ForeignKey('Disciplina'),
    topicos: models.ManyToMany('Topico'),
    ano: models.ForeignKey('Ano'),
})
export default class Tarefa extends models.Model {
    id: number;
    titulo: string;
    tipo: TipoTarefa;
    valor: number;
    bimestre: number;
    detalhes: string;
    duracao: number;
    eventos: Array<Evento>;
    notas: Array<Nota>;
    disciplina: Disciplina;
    topicos: Array<Topico>;
    ano: Ano;

    static tipos = TIPOS;

    static getTarefaLabel(tipo: TipoTarefa): string {
        const labels = {
            [TIPOS.PROVA]: 'Prova',
            [TIPOS.EXERCICIO]: 'Dever',
            [TIPOS.TRABALHO]: 'Trabalho',
            [TIPOS.LISTA_ONLINE]: 'Lista Online',
        };

        return labels[tipo];
    }

    static findByAnoAndProfessor(ano: number, professor: number) {
        return this.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    static findByAnoAndDisciplina(ano: number, disciplina: number) {
        return this.search({ ano, disciplina }, 'findByAnoAndDisciplina');
    }

    static findByEvento(evento: number) {
        return this.search({ evento }, 'findByEvento');
    }

    get pontosText(): string {
        return this.valor ? `${this.valor} pontos - ` : '';
    }

    /**
     * Cor da tarefa quando exibida na agenda
     */
    get color(): string {
        return CONFIG.AGENDA.tipoColorMap[this.tipo];
    }

    /**
     * Retorna a abreviação do tipo de Atividade
     * Ex: PROVA -> P
     */
    get abbr(): string {
        return CONFIG.AGENDA.tipoAbbrMap[this.tipo];
    }

    /**
     * Retorna um nome amigável para o tipo de tarefa
     * Ex: PROVA -> P
     */
    get nomeTipo(): string {
        return CONFIG.AGENDA.tipoNameMap[this.tipo];
    }

    /**
     * Retorna o service que será usado para os collections
     */
    _getCollectionService() {
        let collectionName = this.constructor.collectionName;
        if (this.tipo) {
            collectionName = `${this.tipo}S`.toLowerCase();
        }
        return new CollectionService(collectionName);
    }

    validate() {
        const basic = this.titulo && this.disciplina && this.ano;
        if (!basic) return false;
        if (this.tipo !== Tarefa.tipos.EXERCICIO) {
            const extra = this.bimestre && this.valor;
            if (!extra) return false;
        }
        return true;
    }
}
