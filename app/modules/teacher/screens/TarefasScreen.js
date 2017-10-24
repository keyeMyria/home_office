// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { autorun } from 'mobx';
import { observer } from 'mobx-react/native';
import { Alert } from 'react-native';

import professorStore from '../../../stores/ProfessorStore';
import escolaStore from '../../../stores/EscolaStore';
import topicoStore from '../../../stores/professor/TopicoStore';
import { Tarefa } from './../../../models';
import { TextField, PickerField, ForeignKeyField } from './../../../components/mobx_fields';

import TopicosSelection from './../../../components/TopicosSelection';
import ScreenShell from '../../../components/ScreenShell';

type TipoTarefa = $Keys<typeof Tarefa.tipos>;

@observer
export default class ExamScreen extends Component {
    static navigationOptions = { tabBarVisible: false };

    cancelAutorun: *;
    tarefa = new Tarefa({ tipo: Tarefa.tipos.PROVA });

    constructor(props: any) {
        super(props);
        const tarefa: Tarefa | void = _.get(props, 'navigation.state.params.tarefa');
        const tipo: TipoTarefa | void = _.get(props, 'navigation.state.params.tipo');
        if (tarefa) {
            this.tarefa = tarefa;
        }

        if (!tarefa && tipo) {
            this.tarefa.tipo = tipo;
        }
    }

    componentWillMount() {
        topicoStore.topicosMap.clear();
        this.cancelAutorun = autorun(() => {
            const disciplina = this.tarefa.disciplina && this.tarefa.disciplina.pk;
            const ano = this.tarefa.ano && this.tarefa.ano.pk;
            if (disciplina && ano && this.tarefa.tipo === Tarefa.tipos.PROVA) {
                const selecionados = (this.tarefa.topicos || []).map(t => t.id);
                topicoStore.fetchTopicos(disciplina, ano, selecionados);
            }
        });
    }

    componentWillUnmount() {
        this.cancelAutorun();
    }

    /**
     * Handle for rightpress on toolbar
     */
    rightPress = () => {
        if (this.tarefa.validate()) {
            const { navigate } = this.props.navigation;
            // eslint-disable-next-line no-bitwise
            const hasTopicos = ~[Tarefa.tipos.PROVA, Tarefa.tipos.TRABALHO].indexOf(
                this.tarefa.tipo,
            );
            navigate('SetDateForTarefa', {
                tarefa: this.tarefa,
                topicos: hasTopicos ? topicoStore.topicoSelecionados.slice() : undefined,
                screen: this.props.navigation.state.key,
            });
        } else {
            Alert.alert('Favor preencher todos os campos.');
        }
    };

    /**
     * Handle to LeftPress on toolbar
     */
    leftPress = () => {
        this.props.navigation.goBack();
    };

    renderPeriodo() {
        if (this.tarefa.tipo === Tarefa.tipos.EXERCICIO) return null;
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre');
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(1, num + 1).map(n => [n, `${n}º ${label}`]);

        return <PickerField label={label} items={items} store={this.tarefa} storeKey="bimestre" />;
    }

    renderPontuacao() {
        if (this.tarefa.tipo === Tarefa.tipos.EXERCICIO) return null;
        const items = _.range(1, 36).map(n => [n, `${n} Pontos`]);
        return <PickerField label="Pontuação" items={items} store={this.tarefa} storeKey="valor" />;
    }

    renderTempoAproximado() {
        if (this.tarefa.tipo !== Tarefa.tipos.EXERCICIO) return null;
        const items = _.range(0, 135, 15).map(time => [
            time,
            moment(new Date(time * 60000))
                .utc()
                .format('HH:mm'),
        ]);
        return (
          <PickerField
            label="Tempo Aproximado"
            items={items}
            store={this.tarefa}
            storeKey="duracao"
            placeholder="Selecione"
          />
        );
    }

    renderDetalhes() {
        if (this.tarefa.tipo === Tarefa.tipos.PROVA) return null;
        return (
          <TextField
            label="Detalhes"
            store={this.tarefa}
            storeKey="detalhes"
            placeholder="Descrição..."
            multiline
            maxLength={2000}
          />
        );
    }

    renderTitulo() {
        return (
          <TextField
            label="Título"
            store={this.tarefa}
            storeKey="titulo"
            placeholder="Título da tarefa..."
            maxLength={25}
          />
        );
    }

    renderAno() {
        return (
          <ForeignKeyField
            label="Ano"
            items={professorStore.anosMap}
            store={this.tarefa}
            storeKey="ano"
          />
        );
    }

    renderDisciplina() {
        return (
          <ForeignKeyField
            label="Disciplina"
            items={professorStore.disciplinasMap}
            store={this.tarefa}
            storeKey="disciplina"
          />
        );
    }

    renderTopicos() {
        if (this.tarefa.tipo !== Tarefa.tipos.PROVA) return null;
        return <TopicosSelection topicos={topicoStore.topicosUnflatten} />;
    }

    get screenShellProps(): * {
        const { navigate } = this.props.navigation;
        return {
            leftIcon: 'arrow-back',
            leftPress: this.leftPress,
            navigate,
            title: Tarefa.getTarefaLabel(this.tarefa.tipo),
            rightText: 'Datas',
            showRight: true,
            rightPress: this.rightPress,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {this.renderTitulo()}
            {this.renderAno()}
            {this.renderDisciplina()}
            {this.renderPeriodo()}
            {this.renderPontuacao()}
            {this.renderTempoAproximado()}
            {this.renderDetalhes()}
            {this.renderTopicos()}
          </ScreenShell>
        );
    }
}
