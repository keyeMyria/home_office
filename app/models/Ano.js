// @flow
import * as models from './../lib/models';
import Disciplina from './Disciplina';
import type Tarefa from './Tarefa';
import type Turma from './Turma';
import type Topico from './Topico';

@models.register('Ano', {
    titulo: models.String(),
    abreviacao: models.String(),
    turmas: models.OneToMany('Turma'),
    disciplinas: models.ManyToMany(Disciplina),
    tarefas: models.OneToMany('Tarefa'),
    topicos: models.OneToMany('Topico'),
})
export default class Ano extends models.Model {
    titulo: string;
    abreviacao: string;
    turmas: Array<Turma>;
    disciplinas: Array<Disciplina>;
    tarefas: Array<Tarefa>;
    topicos: Array<Topico>;
}
