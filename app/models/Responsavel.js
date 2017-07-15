// @flow
import * as models from './base';
import Usuario from './Usuario';
import type Aluno from './Aluno';

@models.register('Responsavel', {
    alunos: models.ManyToMany('Aluno'),
})
export default class Responsavel extends Usuario {
    alunos: Array<Aluno>;
}
