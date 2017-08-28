// @flow
import React, { Component } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { computed, observable } from 'mobx';

import { Evento } from './../../../models';
import type { Topico } from './../../../models';
import logger from './../../../lib/logger';
import EventoService from './../../../services/EventoService';
import type { CollectionService } from './../../../lib/services';

// Stores
import professorStore from './../../../stores/ProfessorStore';
import eventosStore from './../../../stores/EventosStore';

import DatePickerField from '../../../components/mobx_fields/DatePickerField';
import ScreenShell from '../../../components/ScreenShell';

@observer
export default class SetDateForTarefa extends Component {
    @observable loading: boolean = true;
    @observable saving: boolean = false;
    @observable eventos: Array<Evento> = [];

    async saveTarefa() {
        try {
            const { params } = this.props.navigation.state;
            const service: CollectionService = params.service;
            const tarefa = params.tarefa;
            const method = tarefa.pk ? 'put' : 'post';
            // $FlowFixMe
            const resp = await service[method](tarefa.toJS());
            if (method === 'post') {
                tarefa.id = resp.id; // eslint-disable-line no-param-reassign
            }
            return tarefa;
        } catch (error) {
            logger.warn('Error Object', error);
            Alert.alert('Erro', '[SDFT-01] Não foi possível salvar a tarefa');
            throw error;
        }
    }

    async saveTopicos(tarefa: *) {
        try {
            const { params } = this.props.navigation.state;
            const service: CollectionService = params.service;
            const topicos: void | Array<Topico> = params.topicos;
            if (topicos && topicos.length) {
                const topicosLink = topicos.map(t => t._selfLink);
                await service.one(tarefa.id).all('topicos').put(topicosLink.join('\n'), true);
            }
        } catch (error) {
            logger.warn('Error Object', error);
            Alert.alert('Erro', '[SDFT-02] Não foi possível salvar a tarefa');
            throw error;
        }
    }

    async saveEventos() {
        try {
            const eventoService = new EventoService();
            return Promise.all(
                this.eventos.map((evento) => {
                    evento.inicio = evento.fim; // eslint-disable-line no-param-reassign
                    if (evento.pk) {
                        return eventoService.one(evento.pk).put(evento.toJS());
                    }
                    return eventoService.post(evento.toJS());
                }),
            );
        } catch (error) {
            logger.warn('Error Object', error);
            Alert.alert('Erro', '[SDFT-03] Não foi possível salvar a tarefa');
            throw error;
        }
    }

    async save() {
        try {
            const { params } = this.props.navigation.state;
            if (!params) return;
            const { navigate } = this.props.navigation;
            const tarefa = await this.saveTarefa();
            await this.saveTopicos(tarefa);
            await this.saveEventos();

            Alert.alert(
                'Sucesso',
                'Dados salvos com sucesso',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            eventosStore.refresh();
                            navigate('HomeRouter');
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            logger.error(error);
            logger.warn('Error Response', error.response);
            logger.warn('Error Request', error.request);
            Alert.alert('Erro', '[SDFT-03] Não foi possível salvar a tarefa');
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
            professorStore
                .fetchTurmas(ano.pk, disciplina.pk)
                .then((turmas) => {
                    turmas.forEach((t) => {
                        const evento = new Evento({});
                        evento.turma = t;
                        evento.tarefa = params.tarefa;
                        this.eventos.push(evento);
                    });
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    logger.error(err);
                    logger.warn(err);
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
