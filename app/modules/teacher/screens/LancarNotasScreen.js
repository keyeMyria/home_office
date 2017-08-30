// @flow
import React, { Component } from 'react';
import { Alert, View } from 'react-native';

import { observable, computed } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { observer } from 'mobx-react/native';

import logger from './../../../lib/logger';

// Store
import eventoStore from '../../../stores/EventosStore';

import StudentGrid from '../../../components/StudentGrid';
import ScreenShell from '../../../components/ScreenShell';
import LoadingModal from '../../../components/LoadingModal';

import { AlunoService, NotaService } from '../../../services';

import { Evento, Aluno, Nota } from '../../../models';

@observer
export default class LancarNotasScreen extends Component {
    _alunoService = new AlunoService();
    _notaService = new NotaService();

    @observable alunosAndNotas: Array<[Nota, Aluno]> = [];
    @observable notasSavePromise: any;

    @computed
    get taskType(): string {
        if (eventoStore.selectedEventLancar && eventoStore.selectedEventLancar.tarefa) {
            return eventoStore.selectedEventLancar.tarefa.tipo;
        }
        return 'PROVA';
    }

    @computed
    get isSaving(): boolean {
        return !!this.notasSavePromise && this.notasSavePromise.state === 'pending';
    }

    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;

        // $FlowFixMe
        const selectedTask: Evento = eventoStore.selectedEventLancar;

        return {
            navigate,
            title: selectedTask.tarefa.tipo === 'PROVA' ? 'Lançar Notas' : 'Lançar Entrega',
            loading: eventoStore.loading,
            rightText: 'Salvar',
            rightPress: this.saveStudentsTask,
            leftIcon: 'arrow-back',
            leftPress: () => navigate('CalendarScreen'),
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
            if ((nota.pontuacao || nota.pontuacao === 0)) {
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

    async getNotaByAluno(event: Evento, aluno: Aluno): Promise<[Nota, Aluno]> {
        try {
            const nota = await this._notaService.findByEventoAndAluno(event.id, aluno.id);
            return [new Nota(nota), aluno];
        } catch (error) {
            if (error.response && error.response.status === 404) {
                const nota = new Nota({});
                nota.aluno = aluno;
                nota.disciplina = event.tarefa.disciplina;
                nota.tarefa = event.tarefa;
                nota.lancado = true;
                return [nota, aluno];
            }
            throw error;
        }
    }

    async loadAlunos(event: Evento) {
        try {
            const response = await this._alunoService.findByEvento(event.id);
            const alunos = Aluno.fromArray(response.alunos);
            const promises = await Promise.all(
                alunos.map(aluno => this.getNotaByAluno(event, aluno)),
            );
            this.alunosAndNotas = promises;
        } catch (error) {
            logger.error(error);
            alert('[LNS-001] Aconteceu um erro no sistema'); // eslint-disable-line no-alert, no-undef
        }
    }

    componentWillMount() {
        const event: ?Evento = eventoStore.selectedEventLancar;
        if (event) {
            try {
                this.loadAlunos(event);
            } catch (error) {
                logger.error(`No event found for event ${event.id}`);
            }
        }
    }

    renderStudentGrid([nota, aluno]: [Nota, Aluno]) {
        const event = eventoStore.selectedEventLancar;
        if (event) {
            return (
              <StudentGrid
                key={aluno.id}
                aluno={aluno}
                evento={event}
                taskType={this.taskType}
                nota={nota}
              />
            );
        }
        return null;
    }

    render() {
        const alunosAndNotas = this.alunosAndNotas || [];
        const savingText = 'Salvando Lancamentos...';

        return (
          <ScreenShell {...this.screenShellProps}>
            <LoadingModal loading={this.isSaving} text={savingText}>
              <View>
                {alunosAndNotas.map(this.renderStudentGrid, this)}
              </View>
            </LoadingModal>
          </ScreenShell>
        );
    }
}
