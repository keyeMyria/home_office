import React, { Component } from 'react';
import { View } from 'react-native';
import { Separator, Text } from 'native-base';
import { PropTypes } from 'mobx-react';

// Components
import CalendarItem from './CalendarItem';

export default class CalendarWeek extends Component {
  static defaultProps = {
    onPress: () => {},
  };

  renderCalendarItems() {
    const { items, onPress } = this.props;

    return (
      items &&
      items.map((item, index) =>
        <CalendarItem key={index} item={item} onPress={onPress} />
      )
    );
  }

  render() {
    const { items, label } = this.props;

    return (
      <View>
        {!!items &&
          !!items.length &&
          <Separator>
            <Text>
              {label}
            </Text>
          </Separator>}
        {this.renderCalendarItems()}
      </View>
    );
  }
}
