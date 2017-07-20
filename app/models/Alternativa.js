// @flow
import * as models from './../lib/models';
import Questao from './Questao';
import type ListaItem from './ListaItem';

@models.register('Alternativa', {
    texto: models.String(),
    correta: models.Boolean(),
    listaItens: models.OneToMany('ListaItem'),
    questao: models.ForeignKey(Questao),
})
export default class Alternativa extends models.Model {
    texto: string;
    correta: boolean;
    listaItens: Array<ListaItem>;
    questao: Questao;
}
