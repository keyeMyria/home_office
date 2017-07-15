// @flow
import * as models from './base';
import Disciplina from './Disciplina';
import Aluno from './Aluno';

@models.register('Rotina', {
    carga: models.Integer(),
    disciplina: models.ForeignKey('Disciplina'),
    aluno: models.ForeignKey('Aluno'),
})
export default class Rotina extends models.Model {
    carga: number;
    disciplina: Disciplina;
    aluno: Aluno;
}
