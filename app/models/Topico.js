// @flow
import * as models from './base';
import Disciplina from './Disciplina';
import type Tarefa from './Tarefa';
import Ano from './Ano';
import type Questao from './Questao';
import type Lancamento from './Lancamento';

@models.register('Topico', {
    titulo: models.String(),
    disciplina: models.ForeignKey('Disciplina'),
    tarefas: models.ManyToMany('Tarefa'),
    subtopicos: models.OneToMany('Topico'),
    parent: models.ForeignKey('Topico'),
    ano: models.ForeignKey('Ano'),
    questoes: models.ManyToMany('Questao'),
    lancamentos: models.OneToMany('Lancamento'),
})
export default class Topico extends models.Model {
    titulo: string;
    disciplina: Disciplina;
    tarefas: Array<Tarefa>;
    subtopicos: Array<Topico>;
    parent: Topico;
    ano: Ano;
    questoes: Array<Questao>;
    lancamentos: Array<Lancamento>;
}
