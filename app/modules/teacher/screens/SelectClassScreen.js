import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, List, ListItem, Body, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import AbsenseScreen from './AbsenseScreen';
import OccurrenceScreen from './OccurrenceScreen';

@observer
export default class SelectClassScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      absenseScreenVisible: false,
      occurrenceScreenVisible: false,
    };
  }

  showAbsenseScreen = () => this.setState({ absenseScreenVisible: true });
  showOccurrenceScreen = () => this.setState({ occurrenceScreenVisible: true });
  hideAbsenseScreen = () => this.setState({ absenseScreenVisible: false });
  hideOccurrenceScreen = () => this.setState({ occurrenceScreenVisible: false });

  getTitle = (nextScreen) => {
    switch (nextScreen) {
      case 'AbsenseScreen':
        return 'Faltas';
      case 'OccurrenceScreen':
        return 'Ocorrências';
    }
  }

  navigate = (nextScreen) => {
    switch (nextScreen) {
      case 'AbsenseScreen':
        this.showAbsenseScreen();
        break;
      case 'OccurrenceScreen':
        this.showOccurrenceScreen();
        break;
    }
  }

  render() {

    const { navigate, state: { params } } = this.props.navigation;
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
              <ListItem key={index} onPress={() => this.navigate(params.nextScreen)}>
                <Text>{clazz.name}</Text>
              </ListItem>
            )}
          </List>
        </Content>
        <AbsenseScreen
          visible={this.state.absenseScreenVisible}
          hideModal={this.hideAbsenseScreen} />
        <OccurrenceScreen
          visible={this.state.occurrenceScreenVisible}
          hideModal={this.hideOccurrenceScreen} />
      </Container>
    );
  }
}