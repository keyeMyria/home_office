import React, { Component } from 'react';
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text } from 'native-base';

export default class Mensagens extends Component {

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <Button onPress={this.props.openDrawer}>
              <Icon name='bars' />
            </Button>
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