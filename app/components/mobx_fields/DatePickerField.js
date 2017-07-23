import React, { Component } from 'react';
import { View, DatePickerIOS, LayoutAnimation, Platform } from 'react-native';
import { Item, Label, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';

export default class DatePickerField extends Component {
    props: {
    value: Date | string,
    format: string,
    mode: string,
    label: string,
    onChange: Date => any,
    placeholder: string,
  };

    static defaultProps = {
        format: 'DD/MM/YYYY',
        mode: 'date',
        label: 'Data',
        placeholder: '--',
        onChange: () => {},
    };

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
        const { value, mode, onChange } = this.props;
        return (
          <DateTimePicker
            mode={mode}
            date={value instanceof Date ? value : new Date()}
            datePickerModeAndroid="calendar"
            isVisible={this.state.visible}
            onConfirm={onChange}
            onCancel={this.toogle}
          />
        );
    }

    renderIPhone() {
        const { value, onChange } = this.props;
        if (!this.state.visible) return false;
        return (
          <DatePickerIOS
            mode="date"
            date={value instanceof Date ? value : new Date()}
            onDateChange={onChange}
            style={{ flex: 1 }}
          />
        );
    }

    render() {
        const { label, format, placeholder, value } = this.props;

        return (
          <View>
            <Item style={styles.item} onPress={this.toogle}>
              <Label style={styles.itemLabel}>
                {label}
              </Label>
              <View style={{ flex: 1 }} />
              <Text style={styles.itemValue}>
                {value instanceof Date ? moment(value).format(format) : placeholder}
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
        paddingHorizontal: 15,
        height: 46,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
        borderRadius: 2,
    },
    itemLabel: {
        color: '#999',
    },
    itemValue: {
        color: '#000',
        fontWeight: 'bold',
    },
};
