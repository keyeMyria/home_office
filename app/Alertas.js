import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Icon, Body, Text } from 'native-base';

import MOCK from './mock/data';

export default class Alertas extends Component {
  render() {
    return (
      <View>
        {MOCK.alertas.map((item, index) =>
          <Card key={index} style={styles.card}>
            <CardItem header style={index <= 1 ? styles.cardHeaderUnreaded : styles.cardHeaderReaded}>
              {index <= 1 ?
                <Icon name="exclamation" style={styles.iconAlert} /> :
                <Icon name="check" style={styles.iconCheck} />
              }
              <Text style={styles.cardHeaderText}>{item.title}</Text>
            </CardItem>
            <CardItem style={index <= 1 ? styles.cardBodyUnreaded : styles.cardBodyReaded}>
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
  cardBodyReaded: {
    backgroundColor: '#C8E6C9'
  },
  cardBodyUnreaded: {
    backgroundColor: '#ffcdd2'
  },
  cardHeaderReaded: {
    backgroundColor: '#A5D6A7'
  },
  cardHeaderUnreaded: {
    backgroundColor: '#ef9a9a'
  },
  cardHeaderText: {
    fontSize: 14
  },
  cardBodyText: {
    fontSize: 12
  },
  iconAlert: {
    fontSize: 14,
    color: '#b71c1c'
  },
  iconCheck: {
    fontSize: 14,
    color: '#1B5E20'
  }
};