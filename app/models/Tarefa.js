// @flow
import * as models from './../lib/models';
import type Evento from './Evento';
import type Nota from './Nota';
import type Disciplina from './Disciplina';
import type Topico from './Topico';
import type Ano from './Ano';

import CONFIG from '../../config';

type TipoTarefa = 'TRABALHO' | 'PROVA' | 'EXERCICIO' | 'LISTA_ONLINE';

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
}
