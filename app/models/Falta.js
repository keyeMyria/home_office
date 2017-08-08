// @flow
import * as models from './../lib/models';
import type Aluno from './Aluno';
import type Disciplina from './Disciplina';

@models.register('Falta', {
    id: models.PrimaryKey(),
    data: models.Date(),
    disciplina: models.ForeignKey('Disciplina'),
    alunos: models.ManyToMany('Aluno'),
})
export default class Falta extends models.Model {
    id: number;
    data: Date;
    disciplina: Disciplina;
    alunos: Array<Aluno>;

    toString(): string {
        return `Falta Dia ${this.data.toLocaleDateString()}`;
    }
}
