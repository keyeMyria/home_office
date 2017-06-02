import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

@observer
export default class Alertas extends Component {
  render() {
    return (
      <View>
        {store.alertas.map((item, index) =>
          <Card key={index} style={styles.card}>
            <CardItem header style={item.readed ? styles.cardHeaderReaded : styles.cardHeaderUnreaded}>
              <Text style={styles.cardHeaderText}>{item.title}</Text>
            </CardItem>
            <CardItem style={item.readed ? styles.cardBodyReaded : styles.cardBodyUnreaded }>
              <Body>
                <Text style={styles.cardBodyText}>{item.message}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      </View>
    );
  }
}

const styles = {
  card: {
    marginLeft: 10,
    marginRight: 10
  },
  cardHeaderReaded: {
    backgroundColor: '#DCEDC8'
  },
  cardBodyReaded: {
    backgroundColor: '#F1F8E9'
  },
  cardHeaderUnreaded: {
    backgroundColor: '#ffcdd2'
  },
  cardBodyUnreaded: {
    backgroundColor: '#ffebee'
  },
  cardHeaderText: {
    fontSize: 15
  },
  cardBodyText: {
    fontSize: 14
  }
};