// @flow
import React, { Component } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { computed, observable } from 'mobx';
import { NavigationActions } from 'react-navigation';

import { Evento } from './../../../models';
import type { Ano, Disciplina, Tarefa } from './../../../models';
import logger from './../../../lib/logger';
import dialog from './../../../lib/dialog';

// Stores
import professorStore from './../../../stores/ProfessorStore';
import eventosStore from './../../../stores/EventosStore';

import DatePickerField from '../../../components/mobx_fields/DatePickerField';
import ScreenShell from '../../../components/ScreenShell';

@observer
export default class SetDateForTarefa extends Component {
    static navigationOptions = { tabBarVisible: false };

    @observable loading: boolean = true;
    @observable saving: boolean = false;
    @observable eventos: Array<Evento> = [];

    get tarefa(): Tarefa | void {
        try {
            return this.props.navigation.state.params.tarefa;
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    }

    async saveTarefa() {
        try {
            this.loading = true;
            const { params } = this.props.navigation.state;
            if (!params) return;

            const tarefa = params.tarefa;
            await tarefa.save();
            if (params.topicos) {
                await tarefa.saveRelated('topicos', params.topicos);
            }
            const saveEventosPromises = this.eventos.map((ev) => {
                ev.inicio = ev.fim; // eslint-disable-line no-param-reassign
                ev.tarefa = tarefa; // eslint-disable-line no-param-reassign
                return ev.save({ reloadData: false });
            });
            await Promise.all(saveEventosPromises);
            dialog.success('A atividade foi salva com sucesso!', () => {
                eventosStore.refresh();
                this.backToAgenda();
            });
        } catch (error) {
            this.loading = false;
            logger.error('Error Object', error);
            // throw error;
            Alert.alert('Erro', '[SDFT-01] Não foi possível salvar a atividade');
        }
    }

    backToAgenda = () => {
        const { params } = this.props.navigation.state;
        this.props.navigation.dispatch(NavigationActions.back({ key: params.screen }));
    };

    save = () => {
        this.saveTarefa().catch(err => logger.warn('error', err));
    };

    async loadTurmas(ano: Ano, disciplina: Disciplina) {
        try {
            if (this.tarefa && this.tarefa.isNew()) {
                const turmas = await professorStore.fetchTurmas(ano.pk, disciplina.pk);
                turmas.forEach((turma) => {
                    this.eventos.push(
                        new Evento({
                            turma,
                            tarefa: this.tarefa,
                        }),
                    );
                });
            } else if (this.tarefa && this.tarefa.id) {
                const eventos = await Evento.findByTarefa(this.tarefa.id);
                this.eventos.push(...eventos);
            }
            this.loading = false;
        } catch (error) {
            logger.error(error);
            this.loading = false;
        }
    }

    /**
     * Load turmas
     */
    componentWillMount() {
        const { params } = this.props.navigation.state;
        if (!params || !this.tarefa) return;
        this.loading = true;
        this.loadTurmas(this.tarefa.ano, this.tarefa.disciplina);
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
            title: 'Selecionar Datas',
            rightText: 'Salvar',
            rightPress: this.save,
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
            <Text>{text}</Text>
          </View>
        );
    }

    renderDates() {
        const dates = this.eventos.map((ev, idx) => (
          <DatePickerField
            key={ev.turma.id}
            label={`Turma ${ev.turma.titulo}`}
            store={this.eventos}
            storeKey={`[${idx}.fim]`}
          />
        ));
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
