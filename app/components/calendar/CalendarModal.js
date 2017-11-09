// @flow
import React, { Component } from 'react';
import { Modal, View, ScrollView, LayoutAnimation, Platform } from 'react-native';
import { H3, Text, Button } from 'native-base';
import { computed, toJS } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from 'lodash';
import userStore from './../../stores/UserStore';
import type { Topico, Tarefa } from './../../models';
import LoadingModal from './../LoadingModal';
import dialog from './../../lib/dialog';
import eventoStore from './../../stores/EventosStore';
import CONFIG from './../../../config';

type Props = {
    onClose: void => void,
    navigate(x: string, p?: { [string]: any }): void,
};

@observer
export default class CalendarModal extends Component {
    props: Props;

    static defaultProps = {
        onClose: () => {},
    };

    @computed
    get isVisible(): boolean {
        return !!eventoStore.selectedEvent;
    }

    @computed
    get event(): ?Object {
        return eventoStore.selectedEventObj || null;
    }

    @computed
    get loading(): boolean {
        if (eventoStore.selectedTarefa) {
            return eventoStore.selectedTarefa.state === 'pending';
        }
        return true;
    }

    @computed
    get topics(): Array<Topico> {
        if (eventoStore.selectedTarefa && eventoStore.selectedTarefa.value) {
            return eventoStore.selectedTarefa.value.topicos;
        }
        return [];
    }

    @computed
    get tarefa(): Tarefa | Object {
        if (eventoStore.selectedTarefa && eventoStore.selectedTarefa.value) {
            return eventoStore.selectedTarefa.value;
        }
        return {};
    }

    componentWillReact() {
        if (Platform.os === 'ios') {
            LayoutAnimation.easeInEaseOut();
        }
    }

    get labelColor(): string {
        const tipo = _.get(this.tarefa, 'tipo');
        return CONFIG.AGENDA.tipoColorMap[tipo] || 'pink';
    }

    renderHeader() {
        if (this.loading || !this.event) return null;
        const item = this.event;
        return (
          <View style={{ ...localStyles.modalHeader, backgroundColor: this.labelColor }}>
            <H3 style={{ textAlign: 'center', color: '#fff' }}>
              {`${CONFIG.AGENDA.tipoNameMap[item.tipo]} de ${_.capitalize(item.disciplina)}`}
            </H3>
          </View>
        );
    }

    renderItem(label: string, text: string, suffix: string = '', isPath: boolean = true) {
        const value = isPath ? _.get(this, text) : text;
        if (!value) {
            return null;
        }
        return (
          <View style={localStyles.modalItens}>
            <View style={{ alignItems: 'flex-end', width: 80 }}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.57)' }}>{label}: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{value}</Text>
            </View>
          </View>
        );
    }

    renderDetalhes() {
        const value = _.get(this, 'tarefa.detalhes');
        if (!value) return null;
        return (
          <View style={localStyles.topicsView}>
            <Text style={{ color: 'rgba(0,0,0,.57)', fontWeight: 'bold' }}>Detalhes: </Text>
            <Text style={localStyles.topicText}>{value}</Text>
          </View>
        );
    }

    renderTopics() {
        if (!this.topics || !this.topics.length) return null;
        return (
          <View style={localStyles.topicsView}>
            <Text style={{ color: 'rgba(0,0,0,.57)', fontWeight: 'bold' }}>Tópicos: </Text>
            <View style={{ alignSelf: 'stretch' }}>
              {this.topics.map(t => (
                <View
                  key={t.id}
                  style={{ marginLeft: 10, flexDirection: 'row', marginTop: 10 }}
                >
                  {/* <Icon name="content-paste" style={{ fontSize: 20 }} /> */}
                  <Text style={localStyles.topicText}>{t.titulo}</Text>
                </View>
                    ))}
            </View>
          </View>
        );
    }

    renderButton(
        label: string,
        callback: any => any,
        bordered: boolean = true,
        options: any = {},
    ) {
        const stylesOptions = options.style || {};

        const props = {
            dark: true,
            block: true,
            bordered,
            ...options,
            style: {
                ...localStyles.button,
                borderColor: bordered ? this.labelColor : null,
                backgroundColor: bordered ? 'transparent' : this.labelColor,
                ...stylesOptions,
            },
            onPress: callback,
        };

        return (
          <Button {...props}>
            <Text style={{ color: bordered ? this.labelColor : '#fff' }}>{label}</Text>
          </Button>
        );
    }

    renderContent() {
        if (!this.event) return null;

        const tarefa = this.tarefa;
        const eventType = tarefa ? tarefa.tipo : '';
        const dateString =
            eventType === 'EXERCICIO' || eventType === 'TRABALHO' ? 'Entrega' : 'Data';

        const data = `${this.event.fim}`.split('-').reverse().join('/');
        return (
          <LoadingModal loading={this.loading}>
            <ScrollView style={localStyles.modalContent}>
              {this.renderItem('Título', 'event.titulo_tarefa')}
              {this.renderItem(`${dateString}`, data, '', false)}
              {this.renderItem('Disciplina', 'event.disciplina')}
              {this.renderItem('Turma', 'event.turma_e_ano')}
              {this.renderItem('Valor', 'event.valor', ' Pontos')}
              {this.renderItem('T. Aprox.', 'event.duracao')}
              {this.renderDetalhes()}
              {this.renderTopics()}
            </ScrollView>
          </LoadingModal>
        );
    }

    deleteEvent = async () => {
        const confirm = await dialog.confirm('Tem certeza que quer deletar o evento?');
        if (confirm) {
            this.props.onClose();
        }
    };

    editEvent() {
        this.props.navigate('TarefasScreen', { tarefa: this.tarefa });
        this.props.onClose();
    }

    fillEventInformation() {
        eventoStore.selectedEventLancar = toJS(eventoStore.selectedEvent);
        this.props.navigate('LancarNotasScreen', eventoStore.selectedEventLancar);
        this.props.onClose();
    }

    renderFooter() {
        if (this.loading) return null;
        const role = userStore.role || 'ALUNO';
        const isProfessor = role === 'PROFESSOR' || role === 'DIRETOR';

        return (
          <View style={localStyles.modalFooter}>
            {isProfessor && (
            <View style={localStyles.modalFooterButtonsContainer}>
              {this.renderButton('Excluir', this.deleteEvent.bind(this))}
              {this.renderButton('Editar', this.editEvent.bind(this))}
            </View>
                )}
            <View style={localStyles.modalFooterButtonsContainer}>
              {isProfessor &&
                        this.renderButton('Lançar', this.fillEventInformation.bind(this))}
              {this.renderButton('Voltar', this.props.onClose, false)}
            </View>
          </View>
        );
    }

    render() {
        const onClose = this.props.onClose;
        const modalOptions = {
            animationType: 'fade',
            transparent: true,
            visible: this.isVisible,
            onRequestClose: onClose,
        };
        return (
          <Modal {...modalOptions}>
            <View style={localStyles.modalBackdrop}>
              <View style={localStyles.modalContainer}>
                {this.renderHeader()}
                {this.renderContent()}
                {this.renderFooter()}
              </View>
            </View>
          </Modal>
        );
    }
}

const localStyles = {
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalContainer: {
        get marginHorizontal() {
            return 20;
        },
        backgroundColor: '#fff',
        minHeight: 100,
        borderRadius: 8,
    },
    modalHeader: {
        alignItems: 'center',
        padding: 24,
        marginBottom: 10,
        borderColor: '#E0E0E0',
        backgroundColor: 'pink',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    modalHeaderTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        maxHeight: 250,
        padding: 24,
    },
    modalFooter: {
        padding: 24,
    },
    modalFooterButtonsContainer: {
        marginHorizontal: -5,
        marginBottom: 0,
        flexDirection: 'row',
    },
    modalItens: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    button: {
        alignSelf: 'auto',
        flex: 1,
        margin: 5,
    },
    get topicsView() {
        return {
            ...this.modalItens,
            flexDirection: 'column',
            marginVertical: 15,
            paddingBottom: 24,
        };
    },
    topicText: {
        flex: 1,
        marginLeft: 5,
        flexWrap: 'wrap',
        fontSize: 14,
    },
};
