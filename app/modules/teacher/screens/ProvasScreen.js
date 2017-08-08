// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import { computed, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import professorStore from '../../../stores/ProfessorStore';
import escolaStore from '../../../stores/EscolaStore';
import topicoStore from '../../../stores/professor/TopicoStore';

import { Tarefa } from './../../../models';
import ProvaService from './../../../services/ProvaService';

import { createTextField } from './../../../components/mobx_fields/TextField';
import { createForeignKeyField } from './../../../components/mobx_fields/ForeignKeyField';
import { createPickerField } from './../../../components/mobx_fields/PickerField';
import TopicosSelection from './../../../components/TopicosSelection';
import ScreenShell from '../../../components/ScreenShell';

@observer
export default class ExamScreen extends Component {
    cancelAutorun: *;
    prova = new Tarefa({ tipo: 'PROVA' });

    constructor(props: *) {
        super(props);
        this.cancelAutorun = autorun(() => {
            const disciplina = this.prova.disciplina && this.prova.disciplina.pk;
            const ano = this.prova.ano && this.prova.ano.pk;
            if (disciplina && ano) {
                topicoStore.fetchTopicos(disciplina, ano);
            }
        });
    }

    componentWillMount() {
        topicoStore.topicosMap.clear();
    }

    componentWillUnmount() {
        this.cancelAutorun();
    }

    showNextScreen = () => {
        const { navigate } = this.props.navigation;
        navigate('SetDateForTarefa', {
            tarefa: this.prova,
            service: new ProvaService(),
            topicos: topicoStore.topicoSelecionados.slice(),
        });
    };

    @computed
    get isComplete(): boolean {
        return !!(
            this.prova.ano &&
            this.prova.bimestre &&
            this.prova.disciplina &&
            this.prova.titulo &&
            this.prova.valor
        );
    }

    renderPeriodo() {
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre');
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(1, num + 1).map(n => [n, `${n}º ${label}`]);
        return createPickerField(label, items, this.prova, 'bimestre');
    }

    renderPontuacao() {
        const items = _.range(1, 11).map(n => [n, `${n} Pontos`]);
        return createPickerField('Pontuação', items, this.prova, 'valor');
    }

    get screenShellProps(): * {
        const { navigate, goBack } = this.props.navigation;
        return {
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            navigate,
            title: 'Prova',
            rightText: '> Datas',
            rightPress: this.showNextScreen,
            showRight: this.isComplete,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {createTextField('Título', this.prova, 'titulo', {
                placeholder: 'Título da Prova...',
            })}
            {createForeignKeyField('Ano', professorStore.anosMap, this.prova, 'ano')}
            {createForeignKeyField(
                    'Disciplina',
                    professorStore.disciplinasMap,
                    this.prova,
                    'disciplina',
                )}
            {this.renderPeriodo()}
            {this.renderPontuacao()}
            <TopicosSelection topicos={topicoStore.topicosUnflatten} />
          </ScreenShell>
        );
    }
}
