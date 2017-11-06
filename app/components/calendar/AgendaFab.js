// @flow
import React, { PureComponent } from 'react';
import { Icon } from 'native-base';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';


import { Tarefa } from './../../models';

@withNavigation
export default class AgendaFab extends PureComponent {

    render() {
        const { navigate } = this.props.navigation;
        const items = [
            Tarefa.tipos.PROVA,
            Tarefa.tipos.TRABALHO,
            Tarefa.tipos.EXERCICIO,
        ].map(tipo => ({
            buttonColor: '#1C7FE2',
            title: Tarefa.getTarefaLabel(tipo),
            onPress: () => navigate('TarefasScreen', { tipo }),
        }));

        const iconStyle = { color: '#fff', fontSize: 24 };

        return (
          <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(255,255,255,0.75)">
            <ActionButton.Item {...items[0]}>
              <Icon name="assignment-turned-in" style={iconStyle} />
            </ActionButton.Item>
            <ActionButton.Item {...items[1]}>
              <Icon name="library-books" style={iconStyle} />
            </ActionButton.Item>
            <ActionButton.Item {...items[2]}>
              <Icon name="tune" style={iconStyle} />
            </ActionButton.Item>
          </ActionButton>
        );
    }
}
