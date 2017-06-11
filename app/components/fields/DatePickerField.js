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
        <Item inlineLabel
          onPress={this.toogle}
          style={{ height: 60 }}>
          <Label style={{ flex: 0.4 }}>{label}</Label>
          <Text style={{ flex: 0.6 }}>{moment(value).format('DD MMM YYYY - HH:mm')}</Text>
        </Item>
        {this.state.visible && <Item>
          <DatePickerIOS
            date={value}
            onDateChange={value => input.onChange(value)}
            style={{ flex: 0.6 }}
            {...custom} />
        </Item>}
      </View>
    );
  }
}