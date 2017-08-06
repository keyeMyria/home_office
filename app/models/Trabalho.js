// @flow
import * as models from './../lib/models';
import type Ano from './Ano';
import type Disciplina from './Disciplina';

@models.register('Trabalho', {
    id: models.PrimaryKey(),
    titulo: models.String(),
    valor: models.Integer(),
    bimestre: models.Integer(),
    tipo: models.Static('TRABALHO'),
    eventos: models.OneToMany('Evento'),
    notas: models.ManyToMany('Nota'),
    disciplina: models.ForeignKey('Disciplina'),
    topicos: models.ManyToMany('Topico'),
    ano: models.ForeignKey('Ano'),
    detalhes: models.String(),
})
export default class Trabalho extends models.Model {
    id: number;
    titulo: string;
    valor: number;
    bimestre: number;
    disciplina: Disciplina;
    ano: Ano;
    detalhes: string;
    tipo: 'TRABALHO';
}
