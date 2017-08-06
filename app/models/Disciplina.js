// @flow
import * as models from './../lib/models';
import type Nota from './Nota';
import type Responsabilidade from './Responsabilidade';
import type Tarefa from './Tarefa';
import type Topico from './Topico';
import type Rotina from './Rotina';
import type Professor from './Professor';
import type Ano from './Ano';

@models.register('Disciplina', {
    id: models.PrimaryKey(),
    titulo: models.String(),
    notas: models.OneToMany('Nota'),
    responsabilidades: models.OneToMany('Responsabilidade'),
    tarefas: models.OneToMany('Tarefa'),
    topicos: models.OneToMany('Topico'),
    rotinas: models.OneToMany('Rotina'),
    professores: models.ManyToMany('Professor'),
    anos: models.ManyToMany('Ano'),
})
export default class Disciplina extends models.Model {
    id: number;
    titulo: string;
    notas: Array<Nota>;
    responsabilidades: Array<Responsabilidade>;
    tarefas: Array<Tarefa>;
    topicos: Array<Topico>;
    rotinas: Array<Rotina>;
    professores: Array<Professor>;
    anos: Array<Ano>;

    toString() {
        return this.titulo || '';
    }
}
