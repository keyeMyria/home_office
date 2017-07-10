// @flow
// import { observable, extendObservable } from 'mobx';
// import _ from 'lodash';
import models from './_base';

@models.register({
    name: 'Disciplina',
    path: 'disciplinas',
    fields: {
        id: models.PK,
        titulo: '',
    },
    related: {
        // disciplinas: { type: models.HAS_MANY, model: 'Disciplina' },
        // turmas: { type: models.HAS_MANY, model: 'Turma' },
        // topicos: { type: models.HAS_MANY, model: 'Topico' },
        // tarefas: { type: models.HAS_MANY, model: 'Tarefa' },
    },
})
export default class Disciplina extends models.Model {
    // Fields
    id: ?number; // When not save id is null
    titulo: string;
}
