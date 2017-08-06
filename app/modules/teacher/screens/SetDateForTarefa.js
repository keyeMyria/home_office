// @flow
import React, { Component } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { computed, observable } from 'mobx';

import { Evento } from './../../../models';
import logger from './../../../lib/logger';
import EventoService from './../../../services/EventoService';

// Stores
import professorStore from './../../../stores/ProfessorStore';

import DatePickerField from '../../../components/mobx_fields/DatePickerField';
import ScreenShell from '../../../components/ScreenShell';

@observer
export default class SetDateForTarefa extends Component {
    @observable loading: boolean = true;
    @observable saving: boolean = false;
    @observable eventos: Array<Evento> = [];

    async save() {
        try {
            const { params } = this.props.navigation.state;
            if (!params) return;
            const { navigate } = this.props.navigation;
            const service = params.service;
            const tarefa = params.tarefa;
            const method = tarefa.pk ? 'put' : 'post';
            const resp = await service[method](tarefa.toJS());
            if (method === 'post') {
                tarefa.id = resp.id;
            }
            await Promise.all(
                this.eventos.map((evento) => {
                    const eventoService = new EventoService();
                    return eventoService.post(evento);
                }),
            );
            Alert.alert('Sucesso', 'Dados salvos com sucesso');
            navigate('CalendarScreen');
        } catch (error) {
            logger.error(error);
            Alert.alert('Erro', '[SDFT-01] Não foi possível salvar a tarefa');
        }
    }

    /**
     * Load turmas
     */
    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params) {
            const ano = params.tarefa.ano;
            const disciplina = params.tarefa.disciplina;
            professorStore.fetchTurmas(ano.pk, disciplina.pk).then((turmas) => {
                turmas.forEach((t) => {
                    const evento = new Evento({});
                    evento.turma = t;
                    evento.tarefa = params.tarefa;
                    this.eventos.push(evento);
                });
                this.loading = false;
            });
        }
    }

    @computed
    get isComplete(): boolean {
        return true;
    }

    get screenShellProps(): * {
        const { navigate, goBack } = this.props.navigation;
        return {
            leftIcon: 'arrow-back',
            leftPress: () => goBack(),
            navigate,
            title: 'Selecionar datas',
            rightText: 'Salvar',
            rightPress: this.save.bind(this),
            showRight: this.isComplete,
        };
    }

    renderLoading(text: string = 'Carregando') {
        const style = {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        };
        return (
          <View style={style}>
            <ActivityIndicator size="large" />
            <Text>
              {text}
            </Text>
          </View>
        );
    }
    renderDates() {
        const dates = this.eventos.map((ev, idx) =>
          (<DatePickerField
            key={ev.turma.id}
            label={`Turma ${ev.turma.titulo}`}
            store={this.eventos}
            storeKey={`[${idx}.fim]`}
          />),
        );
        return dates;
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            {this.loading ? this.renderLoading() : this.renderDates()}
          </ScreenShell>
        );
    }
}
