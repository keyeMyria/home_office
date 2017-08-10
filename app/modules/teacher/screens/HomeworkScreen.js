// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { computed } from 'mobx';

import _ from 'lodash';

// Stores
import professorStore from '../../../stores/ProfessorStore';
import escolaStore from '../../../stores/EscolaStore';

import { Trabalho } from './../../../models';
import TrabalhoService from './../../../services/TrabalhoService';

import { createTextField } from './../../../components/mobx_fields/TextField';
import { createForeignKeyField } from './../../../components/mobx_fields/ForeignKeyField';
import { createPickerField } from './../../../components/mobx_fields/PickerField';

import ScreenShell from '../../../components/ScreenShell';

@observer
export default class HomeworkScreen extends Component {
    trabalho = new Trabalho({});

    showNextScreen = () => {
        const { navigate } = this.props.navigation;
        navigate('SetDateForTarefa', { tarefa: this.trabalho, service: new TrabalhoService() });
    };

    @computed
    get isComplete(): boolean {
        // return !!(
        //     this.trabalho.ano &&
        //     this.trabalho.bimestre &&
        //     this.trabalho.disciplina &&
        //     this.trabalho.titulo &&
        //     this.trabalho.valor
        // );
        return true;
    }

    get screenShellProps(): * {
        const { navigate, goBack } = this.props.navigation;
        return {
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            navigate,
            title: 'Trabalhos',
            rightText: '> Datas',
            rightPress: this.showNextScreen,
            showRight: this.isComplete,
        };
    }

    renderPeriodo() {
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre');
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(1, num + 1).map(n => [n, `${n}º ${label}`]);
        return createPickerField(label, items, this.trabalho, 'bimestre');
    }

    renderPontuacao() {
        const items = _.range(1, 36).map(n => [n, `${n} Pontos`]);
        return createPickerField('Pontuação', items, this.trabalho, 'valor');
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {createTextField('Título', this.trabalho, 'titulo', {
                placeholder: 'Título do Trabalho...',
            })}
            {createForeignKeyField('Ano', professorStore.anosMap, this.trabalho, 'ano')}
            {createForeignKeyField(
                    'Disciplina',
                    professorStore.disciplinasMap,
                    this.trabalho,
                    'disciplina',
                )}
            {this.renderPeriodo()}
            {this.renderPontuacao()}
            {createTextField('Detalhes', this.trabalho, 'detalhes', {
                placeholder: 'Descrição Trabalho...',
                multiline: true,
            })}
          </ScreenShell>
        );
    }
}
