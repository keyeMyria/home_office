// @flow
import React, { Component } from 'react';
import { Text, List, ListItem, Body, Icon, Right } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import ScreenShell from './../../components/ScreenShell';
import ChatScreen from './../../components/ChatScreen';

const ENTIDADES = [
    'Administrativo',
    'Coordenadoria pedagógica',
    'Assistência EducareBox',
    'Responsáveis',
    'Professores',
];

@observer
export default class MessageScreen extends Component {
    @observable
    store = {
        visible: false,
        title: '',
    };

    showChat = (title: string) => {
        this.store.title = title;
        this.store.visible = true;
    };

    hideChat = () => {
        this.store.title = '';
        this.store.visible = false;
    };

    renderItems(name: string, index: number) {
        return (
          <ListItem key={index} button onPress={() => this.showChat(name)}>
            <Body>
              <Text>
                {name}
              </Text>
            </Body>
            <Right>
              <Icon name="keyboard-arrow-right" />
            </Right>
          </ListItem>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Mensagens" navigate={navigate} padder={false}>
            <List button icon>
              {ENTIDADES.map(this.renderItems, this)}
            </List>
            <ChatScreen store={this.store} onClose={this.hideChat} />
          </ScreenShell>
        );
    }
}
