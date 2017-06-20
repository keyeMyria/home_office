import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Left, Body, Thumbnail, Text, ListItem, List, Icon } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../store';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
});

@observer
export default class AppNavigator extends Component {
    render() {
        const { navigate, dispatch } = this.props.navigation;

        return (
          <Container sideBarContainer>
            <ListItem>
              <Left>
                <Thumbnail source={require('../../img/maycon.png')} />
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
                <ListItem onPress={() => navigate('HistoryScreen')} last>
                  <Icon name="history" />
                  <Text>Histórico</Text>
                </ListItem>
                <ListItem>
                  <Icon name="announcement" />
                  <Text>Enviar feedback</Text>
                </ListItem>
                <ListItem>
                  <Icon name="help" />
                  <Text>Ajuda</Text>
                </ListItem>
                <ListItem onPress={() => dispatch(resetAction)}>
                  <Icon name="launch" />
                  <Text>Sair</Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
    }
}
