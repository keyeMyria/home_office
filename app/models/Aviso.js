// @flow
import * as models from './../lib/models';
import type Aluno from './Aluno';

import CONFIG from './../../config';

type AvisoTipoEnum = 'COMUNICADO' | 'FALTA' | 'ATRASO' | 'OCORRENCIA' | 'NOTA' | 'NAO_ENTREGA';

@models.register('Aviso', {
    id: models.PrimaryKey(),
    data: models.Date(),
    titulo: models.String(),
    detalhes: models.String(),
    tipo: models.String(),
    alunos: models.ManyToMany('Aluno'),
    roles: models.Array(),
})
export default class Aviso extends models.Model {
    id: number;
    data: Date;
    titulo: string;
    detalhes: string;
    tipo: AvisoTipoEnum;
    alunos: Array<Aluno>;
    roles: Array<string>;

    get iconName(): string {
        return CONFIG.AVISOS.tipoIconMap[this.tipo];
    }
}
