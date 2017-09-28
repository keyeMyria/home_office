// @flow
import * as models from './../lib/models';
import Ano from './Ano';
import type Evento from './Evento';
import type Responsabilidade from './Responsabilidade';
import type Aluno from './Aluno';

@models.register('Turma', {
    id: models.PrimaryKey(),
    titulo: models.String(),
    eventos: models.OneToMany('Evento'),
    ano: models.ForeignKey('Ano'),
    responsabilidades: models.OneToMany('Responsabilidade'),
    alunos: models.OneToMany('Aluno'),
})
export default class Turma extends models.Model {
    id: number;
    titulo: string;
    eventos: Array<Evento>;
    ano: Ano;
    responsabilidades: Array<Responsabilidade>;
    alunos: Array<Aluno>;

    static findByAnoAndProfessorAndDisciplina(ano: number, professor: number, disciplina: number) {
        return this.search({ ano, professor, disciplina }, 'findByAnoAndProfessorAndDisciplina');
    }

    static findByProfessor(id: number) {
        return this.search({ id }, 'findByProfessor');
    }

    static findByAnoAndProfessor(ano: number, professor: number) {
        return this.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    static findByAno(id: number) {
        return this.search({ id }, 'findByAno');
    }

    static findByAnoAndCurrentUser(ano: number) {
        const user = global.currentUser;
        if (user.role === 'PROFESSOR') {
            return this.findByAnoAndProfessor(ano, user.id);
        }
        return this.findByAno(ano);
    }


    toString(): string {
        return this.titulo || '';
    }
}
