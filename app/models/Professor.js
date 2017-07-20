// @flow
import * as models from './../lib/models';
import Usuario from './Usuario';
import Responsabilidade from './Responsabilidade';
import Disciplina from './Disciplina';


@models.register('Professor', {
    responsabilidades: models.OneToMany('Responsabilidade'),
    disciplinas: models.ManyToMany('Disciplina'),
})
export default class Professor extends Usuario {
    responsabilidades: Array<Responsabilidade>;
    disciplinas: Array<Disciplina>;
}
