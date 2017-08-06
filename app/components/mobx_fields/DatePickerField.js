// @flow
import React, { Component } from 'react';
import { View, DatePickerIOS, LayoutAnimation, Platform } from 'react-native';
import { Item, Label, Text } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import moment from 'moment';
import _ from 'lodash';

@observer
export default class DatePickerField extends Component {
    @observable visible: boolean = false;

    props: {
        format?: string,
        mode?: string,
        label: string,
        store: *,
        storeKey: string,
        placeholder?: string,
    };

    static defaultProps = {
        format: 'DD/MM/YYYY',
        mode: 'date',
        label: 'Data',
        placeholder: '--/--/----',
    };

    componentWillUpdate() {
        if (Platform.OS === 'ios') {
            LayoutAnimation.easeInEaseOut();
        }
    }

    toogle = () => {
        this.visible = !this.visible;
    };

    renderDatePicker() {
        if (Platform.OS === 'ios') {
            return this.renderIPhone();
        }
        return this.renderAndroid();
    }

    /**
     * Update the value in store
     */
    updateValue = (val: string) => {
        const { store, storeKey } = this.props;
        _.set(store, storeKey, val);
    };

    /**
     * Get the value from store
     */
    getValueFromStore(): Date {
        const { store, storeKey } = this.props;
        const value = _.get(store, storeKey);
        return new Date(value);
    }

    /**
     * Render the android component
     */
    renderAndroid() {
        const { mode } = this.props;
        return (
          <DateTimePicker
            mode={mode}
            date={this.getValueFromStore()}
            datePickerModeAndroid="calendar"
            isVisible={this.visible}
            onConfirm={this.updateValue}
            onCancel={this.toogle}
          />
        );
    }

    /**
     * Render the iphone component
     */
    renderIPhone() {
        if (!this.visible) return false;
        return (
          <DatePickerIOS
            mode="date"
            date={this.getValueFromStore()}
            onDateChange={this.updateValue}
            style={{ flex: 1 }}
          />
        );
    }

    render() {
        const { label, format, placeholder } = this.props;
        const value = this.getValueFromStore();
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
