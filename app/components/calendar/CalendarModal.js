import React, { Component } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { H3, Label, Text, Button } from 'native-base';
import { observer } from 'mobx-react/native';
import { PropTypes } from 'mobx-react';

@observer
export default class CalendarModal extends Component {
    static propTypes = {
        state: PropTypes.observableObject,
        onClose: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        onClose: () => {},
    };

    renderModalHeader() {
        const { item } = this.props.state;

        return (
          <View style={localStyles.modalHeader}>
            <H3>
              {item.title || ''}
            </H3>
          </View>
        );
    }

    renderModalFooter() {
        const { onClose } = this.props;
        return (
          <View style={localStyles.modalFooter}>
            <Button transparent onPress={onClose} style={{ alignSelf: 'auto' }}>
              <Text>OK</Text>
            </Button>
          </View>
        );
    }

    render() {
        const { state: { item, visible }, onClose } = this.props;
        return (
          <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <View style={localStyles.modalBackdrop}>
              <View style={localStyles.modalContainer}>
                {this.renderModalHeader()}
                <View style={localStyles.modalContent}>
                  {item.turma &&
                    <View style={localStyles.modalItens}>
                      <Label>Turma: </Label>
                      <Text>
                        {item.turma}
                      </Text>
                    </View>}
                  {item.grade &&
                    <View style={localStyles.modalItens}>
                      <Label>Nota: </Label>
                      <Text>
                        {item.grade} Pontos
                                    </Text>
                    </View>}
                </View>
                {this.renderModalFooter()}
              </View>
            </View>
          </Modal>
        );
    }
}

const localStyles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        padding: 20,
        minHeight: 200,
        backgroundColor: '#fff',
        marginHorizontal: 40,
        alignItems: 'stretch',
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
        flex: 1,
    },
    modalFooter: {
        paddingTop: 10,
        marginTop: 10,
        borderColor: '#E0E0E0',
        alignItems: 'flex-end',
    },
    modalItens: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
