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
    id: number;
    inicio: Date;
    fim: Date;
    duracao: number;
    tarefa: Tarefa;
    turma: Turma;

    static fromSearchArray(eventos: Array<Object>): Array<Evento> {
        return eventos.map((data) => {
            // eslint-disable-next-line no-param-reassign
            data.tarefa.disciplina = data.disciplina;
            // eslint-disable-next-line no-param-reassign
            data.turma.ano = data.ano;
            return new Evento(data);
        });
    }

    static findByProfessor(id: number) {
        return this.search({ id }, 'findByProfessor');
    }

    static findByTarefa(id: number) {
        return this.search({ id }, 'findByTarefa');
    }

    static findByTarefaAndTurma(tarefa: number, turma: number) {
        return this.search({ tarefa, turma }, 'findByTarefaAndTurma');
    }

    static findByAnoAndProfessor(ano: number, professor: number) {
        return this.search({ ano, professor }, 'findByAnoAndProfessor');
    }

    static findByTurma(id: number) {
        return this.search({ id }, 'findByTurma');
    }

    constructor(data: Object | Array<any>): Evento | Array<Evento> {
        if (data && !Array.isArray(data)) {
            if (data.disciplina) {
                // eslint-disable-next-line no-param-reassign
                data.tarefa.disciplina = data.disciplina;
            }
            if (data.ano) {
                // eslint-disable-next-line no-param-reassign
                data.turma.ano = data.ano;
            }
        }
        super(data);
    }

    get turmaAno(): string {
        return `${this.turma.ano.abreviacao} "${this.turma.titulo}"`;
    }

    get infoText(): string {
        return `${this.tarefa.nomeTipo} de ${this.tarefa.disciplina.titulo}\n${this
            .tituloText}${this.tarefa.pontosText}${this.duracaoText}${this.getBimestreText}`;
    }

    get getBimestreText(): string {
        if (this.tarefa.bimestre) {
            return `- ${this.tarefa.bimestre}º Bimestre`;
        }
        return '';
    }

    get tituloText(): string {
        return this.tarefa.titulo ? `${this.tarefa.titulo} ` : '';
    }

    get duracaoText(): string {
        return this.duracaoTextModal && `- ${this.duracaoTextModal} `;
    }

    get duracaoTextModal(): string {
        if (this.tarefa && this.tarefa.duracao) {
            const time = new Date(this.tarefa.duracao * 60000).toJSON().substr(11, 5);
            return `${time}`;
        }
        return '';
    }

    get dataFormatada(): string {
        if (this.fim) {
            return this.fim.format('DD/MM/YYYY');
        }
        return '';
    }

    get dayOfWeek(): string {
        // $FlowFixMe
        return this.fim.format('dd');
    }
}
