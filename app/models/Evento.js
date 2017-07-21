// @flow
import * as models from './../lib/models';
import type Tarefa from './Tarefa';
import type Turma from './Turma';

@models.register('Evento', {
    id: models.PrimaryKey(),
    inicio: models.Date(),
    fim: models.Date(),
    duracao: models.Integer(),
    tarefa: models.ForeignKey('Tarefa'),
    turma: models.ForeignKey('Turma'),
})
export default class Evento extends models.Model {
    inicio: Date;
    fim: Date;
    duracao: number;
    tarefa: Tarefa;
    turma: Turma;

    constructor(data: Object | Array<any>) {
        if (data && !Array.isArray(data)) {
            if (data.disciplina) {
                data.tarefa.disciplina = data.disciplina;
            }
            if (data.ano) {
                data.turma.ano = data.ano;
            }
        }
        super(data);
    }

    get infoText(): string {
        return `${this.tarefa.nomeTipo} de ${this.tarefa.disciplina.titulo}\n${this.tarefa
            .titulo} - ${this.tarefa.pontosText}${this.duracaoText}${this.tarefa
            .bimestre}ºBimestre`;
    }

    get duracaoText(): string {
        if (this.duracao) {
            const time = new Date(this.duracao * 60000).toJSON().substr(11, 5);
            return `${time} - `;
        }
        return '';
    }

    get dayOfWeek(): string {
        // $FlowFixMe
        return this.fim.format('dd');
    }
}
