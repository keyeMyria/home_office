import React, { Component } from 'react';
import { Content, Card, CardItem, Body, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

@observer
export default class Alertas extends Component {
  render() {
    return (
      <Content padder>
        {store.alertas.map((item, index) =>
          <Card key={index} alertaCards>
            <CardItem readed={item.readed} unreaded={!item.readed}>
              <Body>
                <Text title>{item.title}</Text>
                <Text>{item.message}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      </Content>
    );
  }
}