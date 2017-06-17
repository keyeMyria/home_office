import React, { Component } from 'react';
import { View, DatePickerIOS, LayoutAnimation } from 'react-native';
import { Item, Label, Text } from 'native-base';

import moment from 'moment';

export default class DatePickerField extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  toogle = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {

    const { input, label, initialValue, ...custom } = this.props;
    const value = input.value || initialValue;

    return (
      <View>
        <Item stackedLabel style={styles.itemLabel}>
          <Label>{label}</Label>
        </Item>
        <Item style={styles.item} onPress={this.toogle}>
          <Text>{value instanceof Date ? moment(value).format('DD MMM YYYY') : value}</Text>
        </Item>
        {this.state.visible && <Item>
          <DatePickerIOS
            mode="date"
            date={value instanceof Date ? value : new Date() }
            onDateChange={value => input.onChange(value)}
            style={{ flex: 1 }}
            {...custom} />
        </Item>}
      </View>
    );
  }
}

const styles = {
  item: {
    marginTop: 5,
    paddingLeft: 15,
    height: 46,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 2,
  },
  itemLabel: {
    borderBottomWidth: 0,
  }
};