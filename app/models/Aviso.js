// @flow
import * as models from './base';
import type Aluno from './Aluno';

@models.register('Aviso', {
    data: models.Date(),
    titulo: models.String(),
    detalhes: models.String(),
    alunos: models.ManyToMany('Aluno'),
    roles: models.Array(),
})
export default class Aviso extends models.Model {
    data: Date;
    titulo: string;
    detalhes: string;
    alunos: Array<Aluno>;
    roles: Array<string>;
}
