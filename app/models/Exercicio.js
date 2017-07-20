// @flow
import * as models from './../lib/models';
import Tarefa from './Tarefa';

@models.register('Exercicio', {
    detalhes: models.String(),
    duracao: models.Integer(),
})
export default class Exercicio extends Tarefa {
    detalhes: string;
    duracao: number;
}
