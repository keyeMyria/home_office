import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Icon, Body, Title, Right, Content, Text } from 'native-base';

import { observer } from 'mobx-react/native';
// import store from './store';

@observer
export default class Mensagens extends Component {

  render() {

    const { navigate, state } = this.props.navigation;
    
    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>{state.params.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>{state.params.title}</Text>
        </Content>
      </Container>
    );
  }
}