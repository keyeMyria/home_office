// @flow
import * as models from './base';
import Tarefa from './Tarefa';

@models.register('Trabalho', {
    detalhes: models.String(),
})
export default class Trabalho extends Tarefa {
    detalhes: string;
}
