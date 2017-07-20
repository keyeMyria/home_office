// @flow
import * as models from './../lib/models';
import Tarefa from './Tarefa';

@models.register('Trabalho', {
    detalhes: models.String(),
})
export default class Trabalho extends Tarefa {
    detalhes: string;
}
