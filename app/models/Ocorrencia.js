// @flow
import * as models from './../lib/models';
import CONFIG from './../../config';
import type Aluno from './Aluno';

const TIPO_NAME_MAP = CONFIG.OCORRENCIAS.tipoNameMap;

type TipoOcorrencia = $Keys<typeof TIPO_NAME_MAP>;

@models.register('Ocorrencia', {
    id: models.PrimaryKey(),
    data: models.Date(),
    tipo: models.String(),
    detalhes: models.String(),
    alunos: models.ManyToMany('Aluno'),
})
export default class Ocorrencia extends models.Model {
    id: number;
    data: Date;
    tipo: TipoOcorrencia;
    detalhes: string;
    alunos: Array<Aluno>;

    static fromArray(data) {
        console.warn('Ocorrencia Array', data[0]);
        return super.fromArray(data);
    }

    get tipoName(): string {
        return CONFIG.OCORRENCIAS.tipoNameMap[this.tipo] || '';
    }

    toString(): string {
        return this.tipoName;
    }
}
