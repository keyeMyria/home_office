// @flow
import models from './_base';

@models.register({
    name: 'Ano',
    path: 'anos',
    fields: {
        id: models.PK,
        abreviacao: '',
        titulo: '',
    },
    related: {
        disciplinas: { type: models.HAS_MANY, model: 'Disciplina' },
        // turmas: { type: models.HAS_MANY, model: 'Turma' },
        // topicos: { type: models.HAS_MANY, model: 'Topico' },
        // tarefas: { type: models.HAS_MANY, model: 'Tarefa' },
    },
})
export default class Ano extends models.Model {
    // Fields
    id: ?number; // When not save id is null
    abreviacao: string;
    titulo: string;
    disciplinas: Array<Disciplina>;
    turmas: Array<Turma>;
    topicos: Array<Topico>;
    tarefas: Array<Tarefa>;
}
