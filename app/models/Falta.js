// @flow
import * as models from './../lib/models';
import type Aluno from './Aluno';
import type Disciplina from './Disciplina';

@models.register('Falta', {
    data: models.Date(),
    disciplina: models.ForeignKey('Disciplina'),
    alunos: models.ManyToMany('Aluno'),
})
export default class Falta extends models.Model {
    data: Date;
    disciplina: Disciplina;
    alunos: Array<Aluno>;
}
