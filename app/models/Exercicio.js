// @flow
import * as models from './../lib/models';
import type Disciplina from './Disciplina';
import type Ano from './Ano';
import type Evento from './Evento';
import type Nota from './Nota';
import type Topico from './Topico';

type BancoTypeEnum = '';
type GeracaoTypeEnum = '';

@models.register('Exercicio', {
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
export default class Exercicio extends models.Model {
    id: number;
    titulo: string;
    tipo: 'LISTA_ONLINE' | 'EXERCICIO';
    valor: number;
    bimestre: number;
    detalhes: string;
    duracao: number;
    faceis: number;
    medias: number;
    dificeis: number;
    banco: BancoTypeEnum;
    geracao: GeracaoTypeEnum;
    disciplina: Disciplina;
    ano: Ano;
    eventos: Array<Evento>;
    notas: Array<Nota>;
    topicos: Array<Topico>;
}
