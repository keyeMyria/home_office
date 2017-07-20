// @flow
import * as models from './../lib/models';
import type Lancamento from './Lancamento';
import Professor from './Professor';
import Disciplina from './Disciplina';
import Turma from './Turma';

@models.register('Responsabilidade', {
    lancamentos: models.OneToMany('Lancamento'),
    professor: models.ForeignKey('Professor'),
    disciplina: models.ForeignKey('Disciplina'),
    turma: models.ForeignKey('Turma'),
})
export default class Responsabilidade extends models.Model {
    lancamentos: Array<Lancamento>;
    professor: Professor;
    disciplina: Disciplina;
    turma: Turma;
}
