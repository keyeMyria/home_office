// @flow
import * as models from './base';
import type Aluno from './Aluno';

@models.register('Atraso', {
    data: models.Date(),
    alunos: models.ManyToMany('Aluno'),
})
export default class Atraso extends models.Model {
    data: Date;
    alunos: Array<Aluno>;
}
