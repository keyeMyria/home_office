import React, { Component } from 'react';
import {
  Container,
  Content,
  Left,
  Body,
  Thumbnail,
  Text,
  ListItem,
  List,
  Icon
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../store';

@observer
export default class AppNavigator extends Component {

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Container sideBarContainer>
        <ListItem>
          <Left>
            <Thumbnail source={require('../../img/user.png')} />
          </Left>
          <Body>
            <Text>{store.userSelected.name}</Text>
            <Text profileInfo>{store.userSelected.email}</Text>
          </Body>
        </ListItem>
        <Content>
          <List sideBarMenuList>
            <ListItem onPress={() => navigate('HomeRouter')}>
              <Icon name="home" />
              <Text>Visão Geral</Text>
            </ListItem>
            <ListItem onPress={() => navigate('MessageScreen')}>
              <Icon name="question-answer" />
              <Text>Mensagens</Text>
            </ListItem>
            <ListItem onPress={() => navigate('HistoryScreen')}>
              <Icon name="history" />
              <Text>Histórico</Text>
            </ListItem>
            <ListItem onPress={() => navigate('AbsenseScreen')}>
              <Icon name="assignment-turned-in" />
              <Text>Faltas</Text>
            </ListItem>
            <ListItem onPress={() => navigate('OccurrenceScreen')} last>
              <Icon name="highlight-off" />
              <Text>Ocorrências</Text>
            </ListItem>
            <ListItem>
              <Icon name="announcement" />
              <Text>Enviar feedback</Text>
            </ListItem>
            <ListItem>
              <Icon name="help" />
              <Text>Ajuda</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}