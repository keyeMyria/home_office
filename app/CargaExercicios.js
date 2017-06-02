import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Icon, Body, Title, Right, Content, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

@observer
export default class CargaExercicios extends Component {

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => store.openDrawer()}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>{this.props.title}</Text>
        </Content>
      </Container>
    );
  }
}