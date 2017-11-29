// @flow
import * as models from './../lib/models';
import type Disciplina from './Disciplina';
import type Turma from './Turma';

@models.register('Aula', {
    id: models.PrimaryKey(),
    dia: models.Integer(),
    horario: models.ObjectType(),
    turma: models.ForeignKey('Turma'),
    disciplina: models.ForeignKey('Disciplina'),
})
export default class Aula extends models.Model {
    id: number;
    dia: number;
    horario: { id: number, inicio: string, fim: string };
    turma: Turma;
    disciplina: Disciplina;

    static findByDiaAndTurma(dia: number, turma: number): Promise<Array<this>> {
        return this.search({ dia, turma }, 'findByDiaAndTurma');
    }

    static findByDiaAndHorarioAndTurma(
        dia: number,
        horario: number,
        turma: number,
    ): Promise<Array<this>> {
        return this.search({ dia, horario, turma }, 'findByDiaAndHorarioAndTurma');
    }
    static findByTurma(turma: number): Promise<Array<this>> {
        return this.search({ turma }, 'findByTurma');
    }
    static findByProfessor(professor: number): Promise<Array<this>> {
        return this.search({ professor }, 'findByProfessor');
    }

    toString(): string {
        return `${this.disciplina.titulo} (${this.horario.inicio} - ${this.horario.fim})`;
    }
}
