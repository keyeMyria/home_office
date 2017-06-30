import React, { Component } from 'react';
import { View } from 'react-native';
import { Separator, Text } from 'native-base';
import { PropTypes } from 'mobx-react';

// Components
import CalendarItem from './CalendarItem';

export default class CalendarWeek extends Component {
    static propTypes = {
        items: PropTypes.arrayOrObservableArrayOf(CalendarItem.propTypes.item),
        label: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        onPress: () => {},
    };

    renderCalendarItems() {
        const { items, onPress } = this.props;
        return items.map((item, index) =>
          <CalendarItem key={index} item={item} onPress={onPress} />,
        );
    }

    render() {
        const { items, label } = this.props;

        return (
          <View>
            {items.length &&
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
