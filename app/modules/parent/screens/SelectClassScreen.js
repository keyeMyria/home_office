import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Icon,
  List,
  ListItem,
  Body,
  Text,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class SelectClassScreen extends Component {

  getTitle = (nextScreen) => {
    switch (nextScreen) {
      case 'AbsenseScreen':
        return 'Faltas';
      case 'OccurrenceScreen':
        return 'Ocorrências';
    }
  }

  render() {

    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const classes = store.classes;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>{this.getTitle(params && params.nextScreen)}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            {classes.map((clazz, index) =>
              <ListItem key={index} onPress={() => navigate(params.nextScreen)}>
                <Text>{clazz.name}</Text>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}