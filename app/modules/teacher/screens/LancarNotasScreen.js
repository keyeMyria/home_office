// @flow
import React, { Component } from 'react';
import { Alert } from 'react-native';

import { observable, computed } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

import logger from './../../../lib/logger';

// Store
// import eventoStore from '../../../stores/EventosStore';

import StudentGrid from '../../../components/StudentGrid';
import ScreenShell from '../../../components/ScreenShell';

import { AlunoService, NotaService } from '../../../services';

import { Aluno, Nota, Tarefa } from '../../../models';

@observer
export default class LancarNotasScreen extends Component {
    static navigationOptions = { tabBarVisible: false };

    _alunoService = new AlunoService();
    _notaService = new NotaService();

    @observable alunosAndNotas: Array<[Nota, Aluno]> = [];
    @observable notasSavePromise: any;

    constructor(props: any) {
        console.warn('params', props.navigation.state.params);
        super(props);
    }

    get evento(): Object | void {
        return _.get(this.props, 'navigation.state.params.evento');
    }

    get tarefa(): Tarefa | void {
        return _.get(this.props, 'navigation.state.params.tarefa');
    }

    get taskType(): string | void {
        return this.tarefa && this.tarefa.tipo;
    }

    @computed
    get isSaving(): boolean {
        return !!this.notasSavePromise && this.notasSavePromise.state === 'pending';
    }

    get titulo(): string {
        if (this.taskType === 'PROVA' || this.taskType === 'TRABALHO') {
            return 'Lançar Notas';
        }
        return 'Não Entregues';
    }

    get screenShellProps(): Object {
        const { navigate, goBack } = this.props.navigation;

        return {
            navigate,
            title: this.titulo,
            rightText: 'Salvar',
            rightPress: this.saveStudentsTask,
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            showRight: true,
            padder: false,
            style: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
        };
    }

    saveStudentsTask = () => {
        const { navigate } = this.props.navigation;

        const notasSavePromise = this.alunosAndNotas.map(([nota]) => {
            const pontuacao = nota.pontuacao ? Number(nota.pontuacao) : null;

            if (pontuacao || pontuacao === 0) {
                if (!nota.id) {
                    return this._notaService.post(nota.toJS());
                }
                nota.lancado = true; // eslint-disable-line no-param-reassign
                return this._notaService.one(nota.id).patch(nota.toJS());
            }
            return null;
        });
        this.notasSavePromise = fromPromise(Promise.all(notasSavePromise));
        this.notasSavePromise.promise
            .then(() => {
                Alert.alert('Sucesso', 'Lançamentos salvos com sucesso');
                navigate('CalendarScreen');
            })
            .catch((err) => {
                Alert.alert('ERRO', 'Não foi possível salvar os lançamentos');
                logger.warn(err);
            });
    };

    async getNotaByAluno(eventID: number, tarefa: Tarefa, aluno: Aluno): Promise<[Nota, Aluno]> {
        try {
            const nota = await this._notaService.findByEventoAndAluno(eventID, aluno.id);
            return [new Nota(nota), aluno];
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const nota = new Nota({});
                nota.aluno = aluno;
                nota.disciplina = tarefa.disciplina;
                nota.tarefa = tarefa;
                nota.lancado = true;
                return [nota, aluno];
            }
            throw error;
        }
    }

    async loadAlunos(eventID: number, tarefa: Tarefa) {
        try {
            const response = await this._alunoService.findByEvento(eventID);
            const alunos = Aluno.fromArray(response.alunos);
            const promises = await Promise.all(
                alunos.map(aluno => this.getNotaByAluno(eventID, tarefa, aluno)),
            );
            this.alunosAndNotas = promises;
        } catch (error) {
            logger.error(error);
            alert('[LNS-001] Aconteceu um erro no sistema'); // eslint-disable-line no-alert, no-undef
        }
    }

    componentWillMount() {
        const eventID: ?number = this.evento && this.evento.id;
        const tarefa = this.tarefa;
        if (eventID && tarefa) {
            try {
                this.loadAlunos(eventID, tarefa);
            } catch (error) {
                logger.error(`No event found for event ${eventID}`);
            }
        }
    }

    renderStudentGrid([nota, aluno]: [Nota, Aluno]) {
        if (this.evento) {
            return (
              <StudentGrid
                key={aluno.id}
                aluno={aluno}
                evento={this.evento}
                taskType={this.taskType}
                nota={nota}
              />
            );
        }
        return null;
    }

    render() {
        const alunosAndNotas = this.alunosAndNotas || [];

        return (
          <ScreenShell {...this.screenShellProps}>
            {alunosAndNotas.map(this.renderStudentGrid, this)}
          </ScreenShell>
        );
    }
}
