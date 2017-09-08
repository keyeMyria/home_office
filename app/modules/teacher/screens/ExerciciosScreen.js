// @flow
import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react/native';

import _ from 'lodash';
import moment from 'moment';

// Stores
import professorStore from '../../../stores/ProfessorStore';

import { createTextField } from './../../../components/mobx_fields/TextField';
import { createForeignKeyField } from './../../../components/mobx_fields/ForeignKeyField';
import { createPickerField } from './../../../components/mobx_fields/PickerField';

import { Exercicio } from './../../../models';
import ExercicioService from './../../../services/ExercicioService';

import ScreenShell from '../../../components/ScreenShell';

@observer
export default class ExerciciosScreen extends Component {
    exercicio = new Exercicio({
        tipo: 'EXERCICIO',
    });

    showNextScreen = () => {
        const { navigate } = this.props.navigation;
        navigate('SetDateForTarefa', { tarefa: this.exercicio, service: new ExercicioService() });
    };

    @computed
    get isComplete(): boolean {
        // return !!(this.exercicio.ano && this.exercicio.disciplina && this.exercicio.titulo);
        return true;
    }

    get screenShellProps(): * {
        const { navigate, goBack } = this.props.navigation;
        return {
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            navigate,
            title: 'Exercícios',
            rightText: 'Datas',
            rightPress: this.showNextScreen,
            showRight: this.isComplete,
        };
    }

    renderTempoAproximado() {
        const items = _.range(0, 135, 15).map(time => [
            time,
            moment(new Date(time * 60000)).utc().format('HH:mm'),
        ]);
        return createPickerField('Tempo Aproximado', items, this.exercicio, 'duracao', {
            placeholder: '',
        });
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {createTextField('Título', this.exercicio, 'titulo', {
                placeholder: 'Título do Exercício...',
                maxLength: 25,
            })}
            {createForeignKeyField('Ano', professorStore.anosMap, this.exercicio, 'ano')}
            {createForeignKeyField(
                    'Disciplina',
                    professorStore.disciplinasMap,
                    this.exercicio,
                    'disciplina',
                )}
            {this.renderTempoAproximado()}
            {createTextField('Detalhes', this.exercicio, 'detalhes', {
                placeholder: 'Descrição Exercício...',
                multiline: true,
                maxLength: 2000,
            })}
          </ScreenShell>
        );
    }
}
