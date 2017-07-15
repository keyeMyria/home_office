// @flow
import * as models from './base';
import type Tarefa from './Tarefa';
import type Turma from './Turma';

@models.register('Evento', {
    id: models.PrimaryKey(),
    inicio: models.Date(),
    fim: models.Date(),
    duracao: models.Integer(),
    tarefa: models.ForeignKey('Tarefa'),
    turma: models.ForeignKey('Turma'),
})
export default class Evento extends models.Model {
    inicio: Date;
    fim: Date;
    duracao: Number;
    tarefa: Tarefa;
    turma: Turma;

    get color(): string {
        return this.tarefa.valor;
    }

}
