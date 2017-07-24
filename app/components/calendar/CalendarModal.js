// @flow
import React, { Component } from 'react';
import { Modal, View, Alert } from 'react-native';
import { H3, Label, Text, Button, Icon } from 'native-base';

import { computed, toJS } from 'mobx';
import { observer } from 'mobx-react/native';

import _ from 'lodash';

// Store
import userStore from './../../stores/UserStore';
import eventoStore from './../../stores/EventosStore';

import type { Evento, Topico } from './../../models';
import LoadingModal from './../LoadingModal';


@observer
export default class CalendarModal extends Component {
    props: {
        onClose: void => void,
        navigate: string => void
    };

    static defaultProps = {
        onClose: () => {},
    };

    @computed
    get isVisible(): boolean {
        return !!eventoStore.selectedEvent;
    }

    @computed
    get event(): Evento {
        return eventoStore.selectedEvent || {};
    }

    @computed
    get loading(): boolean {
        if (eventoStore.selectedEventTopics) {
            return eventoStore.selectedEventTopics.state === 'pending';
        }
        return true;
    }

    @computed
    get topics(): Array<Topico> {
        if (eventoStore.selectedEventTopics && eventoStore.selectedEventTopics.value) {
            return eventoStore.selectedEventTopics.value;
        }
        return [];
    }

    renderHeader() {
        if (this.loading) return null;

        return (
          <View style={localStyles.modalHeader}>
            <H3>
              {_.get(this.event, 'tarefa.titulo') || '<Título>'}
            </H3>
          </View>
        );
    }

    renderItem(label: string, text: string, suffix: string = '', isPath: boolean = true) {
        const value = isPath ? _.get(this, text) : text;
        if (!value) return null;
        return (
          <View style={localStyles.modalItens}>
            <Label>{`${label}: `}</Label>
            <Text>
              {value}
            </Text>
          </View>
        );
    }

    renderTopics() {
        if (!this.topics || !this.topics.length) return null;
        return (
          <View style={localStyles.topicsView}>
            <Label>Tópicos: </Label>
            <View style={{ marginLeft: 25, alignSelf: 'stretch' }}>
              {this.topics.map(t =>
                (<View key={t.id} style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Icon name="content-paste" style={{ fontSize: 20 }} />
                  <Text style={localStyles.topicText}>
                    {t.titulo}
                  </Text>
                </View>),
                    )}
            </View>
          </View>
        );
    }

    renderButton(label: string, callback: any => void, bordered: boolean = true) {
        return (
          <Button bordered={bordered} block onPress={callback} style={localStyles.button}>
            <Text>
              {label}
            </Text>
          </Button>
        );
    }

    renderContent() {
        return (
          <LoadingModal loading={this.loading}>
            <View style={localStyles.modalContent}>
              {this.renderItem('Turma', 'event.turma.titulo')}
              {this.renderItem('Nota', 'event.tarefa.valor', ' Pontos')}
              {this.renderItem('Tempo Aprox.', 'event.duracaoText')}
              {this.renderTopics()}
            </View>
          </LoadingModal>
        );
    }

    async confirmDeleteAction() {
        await eventoStore.deleteEvent();
        this.props.onClose();
    }

    deleteEvent = (): any => {
        // Works on both iOS and Android
        Alert.alert(
            'Atenção!',
            'Tem certeza que quer deletar o evento?',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'OK', onPress: () => this.confirmDeleteAction() },
            ],
            { cancelable: true },
        );
    }

    editEvent() {
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
        const isProfessor = role === 'PROFESSOR';

        return (
          <View style={localStyles.modalFooter}>
            {isProfessor &&
            <View style={localStyles.modalFooterButtonsContainer}>
              {this.renderButton('Excluir', this.deleteEvent.bind(this)) }
              {this.renderButton('Editar', this.editEvent.bind(this)) }
            </View>}
            <View style={localStyles.modalFooterButtonsContainer}>
              {isProfessor && this.renderButton('Lançar', this.fillEventInformation.bind(this))}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        alignSelf: 'stretch',
        get marginHorizontal() {
            return 20;
        },
        padding: 20,
        backgroundColor: 'white',
        minHeight: 100,
    },
    modalHeader: {
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 10,
        borderColor: '#E0E0E0',
    },
    modalHeaderTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        // flex: 1,
    },
    modalFooter: {
        paddingTop: 10,
        marginTop: 15,
    },
    modalFooterButtonsContainer: {
        marginHorizontal: -5,
        marginBottom: 0,
        flexDirection: 'row',
    },
    modalItens: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        };
    },
    topicText: {
        flex: 1,
        marginLeft: 5,
        flexWrap: 'wrap',
    },
};
