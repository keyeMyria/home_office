// @flow
import * as models from './base';
import Questao from './Questao';
import ListaGerada from './ListaGerada';
import Alternativa from './Alternativa';

@models.register('ListaItem', {
    questao: models.ForeignKey('Questao'),
    listaGerada: models.ForeignKey('ListaGerada'),
    escolha: models.ForeignKey('Alternativa'),
})
export default class ListaItem extends models.Model {
    questao: Questao;
    listaGerada: ListaGerada;
    escolha: Alternativa;
}
