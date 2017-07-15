// @flow
import * as models from './base';
import type ListaItem from './ListaItem';
import type Alternativa from './Alternativa';
import type Topico from './Topico';

@models.register('Questao', {
    enunciado: models.String(),
    imagem: models.String(),
    listaItem: models.OneToMany('ListaItem'),
    alternativas: models.OneToMany('Alternativa'),
    topicos: models.ManyToMany('Topico'),
})
export default class Questao extends models.Model {
    enunciado: string;
    imagem: string;
    listaItem: Array<ListaItem>;
    alternativas: Array<Alternativa>;
    topicos: Array<Topico>;
}
