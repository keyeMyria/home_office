// @flow
import * as models from './../lib/models';
import type Aluno from './Aluno';

@models.register('Responsavel', {
    alunos: models.ManyToMany('Aluno'),
})
export default class Responsavel extends models.Model {
    alunos: Array<Aluno>;
}
