// @flow
import * as models from './../lib/models';
import httpClient from './../lib/HttpClient';

import type Aluno from './Aluno';
import type Disciplina from './Disciplina';

@models.register('Falta', {
    id: models.PrimaryKey(),
    data: models.Date(),
    disciplina: models.ForeignKey('Disciplina'),
    alunos: models.ManyToMany('Aluno'),
})
export default class Falta extends models.Model {
    id: number;
    data: Date;
    disciplina: Disciplina;
    alunos: Array<Aluno>;

    static getAlunos(date: string | Date, ano?: number, turma?: number, aula?: number) {
        const data = new Date(date).toJSON().substr(0, 10);
        return httpClient
            .post('faltas/search/alunos', { data, ano, turma, aula })
            .then(resp => resp.data)
            .then(result => result.map(a => a.id));
    }

    static toggle(alunoId: number, data: string, falta: boolean, aula?: number, todas?: boolean) {
        if (!alunoId || !data) {
            throw new Error('Parametros "alunoId" e "data" são obrigatórios');
        }
        if (aula && todas) {
            throw new Error('Parametros "aula" e "todas" são mutuamente exclusivos');
        }

        return httpClient.put(`faltas/aluno/${alunoId}`, {
            aula,
            todas,
            data,
            falta,
        });
    }

    toString(): string {
        return `Falta Dia ${this.data.toLocaleDateString()}`;
    }
}
