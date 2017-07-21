// @flow
import * as models from './../lib/models';
import Aluno from './Aluno';
import Disciplina from './Disciplina';
import Tarefa from './Tarefa';

@models.register('Nota', {
    id: models.PrimaryKey(),
    pontuacao: models.Float(),
    naoEntregue: models.Boolean(),
    lancado: models.Boolean(),
    aluno: models.ForeignKey('Aluno'),
    disciplina: models.ForeignKey('Disciplina'),
    tarefa: models.ForeignKey('Tarefa'),
})
export default class Nota extends models.Model {
    id: number;
    pontuacao: number;
    naoEntregue: boolean;
    lancado: boolean;
    aluno: Aluno;
    disciplina: Disciplina;
    tarefa: Tarefa;
}
