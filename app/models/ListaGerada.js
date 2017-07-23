// @flow
import * as models from './../lib/models';
import type ListaOnline from './ListaOnline';
import Aluno from './Aluno';
import ListaItem from './ListaItem';

@models.register('ListaGerada', {
    submetida: models.Boolean(),
    listaOnline: models.ForeignKey('ListaOnline'),
    aluno: models.ForeignKey('Aluno'),
    itens: models.OneToMany('ListaItem'),
})
export default class ListaGerada extends models.Model {
    submetida: boolean;
    listaOnline: ListaOnline;
    aluno: Aluno;
    itens: Array<ListaItem>;
}
