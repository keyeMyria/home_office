import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Text, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class TimePickerField extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.toogle = this.toogle.bind(this);
        this.handleTimePicked = this.handleTimePicked.bind(this);
    }

    toogle() {
        this.setState({ visible: !this.state.visible });
    }

    handleTimePicked(value) {
        this.props.input.onChange(value);
        this.toogle();
    }

    render() {
        const { input, initialValue, ...custom } = this.props;
        const value = input.value || initialValue;

        return (
          <View style={{ flex: 1 }}>
            <Item style={styles.item} onPress={this.toogle}>
              <Text style={{ flex: 1, textAlign: 'center'}}>
                {value instanceof Date ? moment(value).format('HH:mm') : value}
              </Text>
              <Icon name="timer" />
            </Item>
            <DateTimePicker
              titleIOS="Selecione um Horário"
              mode="time"
              confirmTextIOS="Confirmar"
              cancelTextIOS="Cancelar"
              datePickerModeAndroid="spinner"
              isVisible={this.state.visible}
              onConfirm={this.handleTimePicked}
              onCancel={this.toogle}
            />
          </View>
        );
    }
}

const styles = {
    item: {
        marginTop: 5,
        paddingLeft: 5,
        height: 35,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
        borderRadius: 2,
    },
};
