import React, { Component } from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

// Store
import eventoStore from '../../../stores/EventosStore';

import StudentGrid from '../../../components/StudentGrid';
import ScreenShell from '../../../components/ScreenShell';

import { AlunoService, NotaService } from '../../../services';

import { Evento, Aluno, Nota } from '../../../models';

@observer
export default class LancarNotasScreen extends Component {

    _taskType: any;
    _alunoService = new AlunoService();
    _notaService = new NotaService();

    @observable alunosAndNotas: Array<Map<String, Object>> = [];

    constructor() {
        super();

        if (eventoStore.selectedEventLancar && eventoStore.selectedEventLancar.tarefa) {
            this._taskType = eventoStore.selectedEventLancar.tarefa.tipo;
        }

        this.onPressCheckBox = this.onPressCheckBox.bind(this);
        this.onChangeInputText = this.onChangeInputText.bind(this);
        this.getNotaByAluno = this.getNotaByAluno.bind(this);
    }

    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;

        // $FlowFixMe
        const selectedTask:Evento = eventoStore.selectedEventLancar;

        return {
            navigate,
            title: selectedTask.tarefa.tipo === 'PROVA' ? 'Lançar Notas' : 'Lançar entrega',
            loading: eventoStore.loading,
            rightText: 'Salvar',
            rightPress: this.saveStudentsTask.bind(this),
            leftIcon: 'arrow-back',
            leftPress: () => navigate('CalendarScreen'),
            showRight: true,
            padder: false,
        };
    }

    saveStudentsTask() {
        this.alunosAndNotas.forEach((item) => {
            const nota = item.get('nota');

            if (nota.id === null) {
                // post
                this._notaService.post(nota);
            } else {
                // patch
                this._notaService.patch(nota);
            }
        });
    }

    async getNotaByAluno(event, aluno) {
        const nota = await this._notaService.findByEventoAndAluno(event.id, aluno.id);
        return nota;
    }

    componentWillMount() {
        // $FlowFixMe
        const event:Evento = eventoStore.selectedEventLancar;
        const component = this;

        component._alunoService.findByEvento(event.id).then((data) => {
            data.alunos.forEach((aluno) => {
                // Loading the grades when component is rendered
                component.getNotaByAluno(event, aluno).then((nota) => {
                    const userData = new Map();

                    userData.set('nota', nota);
                    userData.set('aluno', aluno);
                    component.alunosAndNotas.push(userData);
                });
            });
        });
    }

    updateAlunosAndNotas(value, alunoId, type) {
        this.alunosAndNotas = this.alunosAndNotas.map((item) => {
            const aluno = item.get('aluno');
            let nota = item.get('nota');

            if (aluno.id === alunoId) {
                if (nota === null) {
                    nota = new Nota();
                    const evento = eventoStore.selectedEventLancar;
                    nota.aluno = aluno;
                    nota.disciplina = evento.disciplina;
                    nota.tarefa = evento.disciplina.tarefa;
                }

                if (type === 'PROVA') {
                    nota.lancado = value;
                } else {
                    nota.pontuacao = value;
                }

                item.set('nota', nota);
            }
            return item;
        });
    }

    onPressCheckBox(value, alunoId) {
        this.updateAlunosAndNotas.bind(this)(value, alunoId, this._taskType);
    }

    onChangeInputText(value, alunoId) {
        this.updateAlunosAndNotas.bind(this)(value, alunoId, this._taskType);
    }

    render() {
        const alunosAndNotas = this.alunosAndNotas || [];

        // $FlowFixMe
        const event:Evento = eventoStore.selectedEventLancar;
        const taskType = event.tarefa.tipo;

        return (
          <ScreenShell {...this.screenShellProps}>
            {alunosAndNotas && alunosAndNotas.map((item) => {
                const aluno:Aluno = item.get('aluno');
                return (<StudentGrid
                  key={aluno.id}
                  aluno={aluno}
                  evento={event}
                  taskType={taskType}
                  nota={`${item.get('nota').pontuacao}`}
                  onPress={this.onPressCheckBox}
                  onChange={this.onChangeInputText}
                />);
            })}
          </ScreenShell>
        );
    }
}
