// @flow
import * as models from './base';
import type Aluno from './Aluno';

type TipoOcorrencia = 'BAGUNCA' | 'ATRASO' | 'DESRESPEITO' | 'OUTROS';

@models.register('Ocorrencia', {
    data: models.Date(),
    tipo: models.String(),
    detalhes: models.String(),
    alunos: models.ManyToMany('Aluno'),
})
export default class Ocorrencia extends models.Model {
    data: Date;
    tipo: TipoOcorrencia;
    detalhes: string;
    alunos: Array<Aluno>;
}
