// @flow
import React, { Component } from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

// Store
import eventoStore from '../../../stores/EventosStore';

import StudentGrid from '../../../components/StudentGrid';
import ScreenShell from '../../../components/ScreenShell';

import AlunoService from '../../../services/AlunoService';

import { Evento, Aluno } from '../../../models';

@observer
export default class LancarNotasScreen extends Component {

    _service = new AlunoService();
    @observable _alunosByEvento: any;
    @observable _alunosChecked: Array<number> = [];

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
        // $FlowFixMe
        const event:Evento = eventoStore.selectedEventLancar;

        this._alunosChecked.forEach((alunoId) => {
            const data = {
                aluno: this._service.one(alunoId).fullPath,
                disciplina: event.tarefa.disciplina._links.self,
                lancado: true,
                naoEntregue: null,
                pontuacao: null,
                tarefa: null,
            };
            console.log(data);
        });
    }

    componentWillMount() {
        // $FlowFixMe
        const event:Evento = eventoStore.selectedEventLancar;

        this._service.findByEvento(event.turma.ano.id).then((data) => {
            this._alunosByEvento = data.alunos;
        });
    }

    render() {
        const items = this._alunosByEvento || [];
        // $FlowFixMe
        const event:Evento = eventoStore.selectedEventLancar;
        const taskType = event.tarefa.tipo;

        const onPress = (value, studenId) => {
            if (value) {
                this._alunosChecked.push(studenId);
            } else {
                const index = this._alunosChecked.indexOf(studenId);

                if (index !== -1) {
                    this._alunosChecked.splice(index, 1);
                }
            }
        };

        return (
          <ScreenShell {...this.screenShellProps}>
            {items.map((item) => {
                const aluno:Aluno = item;
                // $FlowFixMe
                return (<StudentGrid
                  key={item.id}
                  aluno={aluno}
                  evento={event}
                  taskType={taskType}
                  onPress={onPress}
                />);
            })}
          </ScreenShell>
        );
    }
}
