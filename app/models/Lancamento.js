// @flow
import * as models from './base';
import Topico from './Topico';
import Responsabilidade from './Responsabilidade';

@models.register('Lancamento', {
    data: models.Date(),
    topico: models.ForeignKey('Topico'),
    responsabilidade: models.ForeignKey('Responsabilidade'),
})
export default class Lancamento extends models.Model {
    data: Date;
    topico: Topico;
    responsabilidade: Responsabilidade;
}
