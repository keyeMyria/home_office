// @flow
import * as models from './base';
import ListaGerada from './ListaGerada';

type TipoBanco = 'ESCOLA' | 'PROVAS_ANTERIORES' | 'SISTEMA';
type MetodoGeracao = 'INDIVIDUAL' | 'UNICA' | 'SELECAO';

@models.register('ListaOnline', {
    banco: models.String(),
    geracao: models.String(),
    faceis: models.Integer(),
    medias: models.Integer(),
    dificeis: models.Integer(),
    listasGeradas: models.OneToMany('ListaGerada'),
})
export default class ListaOnline extends models.Model {
    banco: TipoBanco;
    geracao: MetodoGeracao;
    faceis: number;
    medias: number;
    dificeis: number;
    listasGeradas: Array<ListaGerada>;
}
