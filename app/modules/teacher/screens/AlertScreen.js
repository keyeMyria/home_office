import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Card, CardItem, Body, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class AlertScreen extends Component {

  render() {

    const { navigate } = this.props.navigation;
    const alerts = store.teacherAlerts.items;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Alertas</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Content padder>
            {alerts.map((alert, index) =>
              <Card key={index} cardAlert>
                <CardItem readed={alert.readed} unreaded={!alert.readed}>
                  <Body>
                    <Text title>{alert.title}</Text>
                    <Text>{alert.message}</Text>
                  </Body>
                </CardItem>
              </Card>
            )}
          </Content>
        </Content>
      </Container>
    );
  }
}