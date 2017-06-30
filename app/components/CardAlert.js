import React, { Component } from 'react';
import { Card, CardItem, Body, Text } from 'native-base';

export default class CardAlert extends Component {
    static propTypes = {
        alert: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            message: React.PropTypes.string.isRequired,
            readed: React.PropTypes.bool.isRequired,
        }).isRequired,
    };

    render() {
        const { alert } = this.props;
        return (
          <Card cardAlert>
            <CardItem readed={alert.readed} unreaded={!alert.readed}>
              <Body>
                <Text title>
                  {alert.title}
                </Text>
                <Text>
                  {alert.message}
                </Text>
              </Body>
            </CardItem>
          </Card>
        );
    }
}
