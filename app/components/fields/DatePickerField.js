import React, { Component } from 'react';
import { View, DatePickerIOS, LayoutAnimation, Platform } from 'react-native';
import { Item, Label, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';

export default class DatePickerField extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.toogle = this.toogle.bind(this);
    }

    componentWillUpdate() {
        if (Platform.OS === 'ios') {
            LayoutAnimation.easeInEaseOut();
        }
    }

    toogle() {
        this.setState({ visible: !this.state.visible });
    }

    renderDatePicker() {
        if (Platform.OS === 'ios') {
            return this.renderIPhone();
        }
        return this.renderAndroid();
    }

    renderAndroid() {
        const { input, initialValue } = this.props;
        const value = input.value || initialValue;

        return (
          <DateTimePicker
            mode="date"
            date={value instanceof Date ? value : new Date()}
            datePickerModeAndroid="calendar"
            isVisible={this.state.visible}
            onConfirm={date => input.onChange(date)}
            onCancel={this.toogle}
          />
        );
    }
    renderIPhone() {
        const { input, initialValue, ...custom } = this.props;
        const value = input.value || initialValue;

        if (!this.state.visible) return false;

        return (
          <DatePickerIOS
            mode="date"
            date={value instanceof Date ? value : new Date()}
            onDateChange={date => input.onChange(date)}
            style={{ flex: 1 }}
            {...custom}
          />
        );
    }

    render() {
        const { input, label, initialValue, ...custom } = this.props;
        const _initialValue = initialValue instanceof Date ? initialValue : new Date();
        const value = input.value || _initialValue;

        return (
          <View>
            <Item stackedLabel style={styles.itemLabel}>
              <Label>{label}</Label>
            </Item>
            <Item style={styles.item} onPress={this.toogle}>
              <Text>
                {value instanceof Date ? moment(value).format('DD/MM/YYYY') : value}
              </Text>
            </Item>
            {this.renderDatePicker()}
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
    },
};
