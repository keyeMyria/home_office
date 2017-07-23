// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Item, Text } from 'native-base';
import { observer } from 'mobx-react/native';

@observer
export default class PickerField extends Component {
    props: {
    label: string,
    value: number | string,
    items: Array<any>,
    itemValue: string,
    itemLabel: string,
    showEmpty: string,
    emptyLabel: string,
    emptyValue: string | number,
    iosHeader: string,
    onChange: (string | number) => void,
  };

    static defaultProps = {
        itemValue: 'id',
        itemLabel: 'nome',
        showEmpty: true,
        emptyLabel: '-- Selecione --',
        emptyValue: 0,
        iosHeader: 'Selecione',
        value: 0,
    };

    get emptyItem(): Picker.Item {
        const { emptyValue, emptyLabel } = this.props;
        return (
          <Picker.Item key={emptyValue} value={emptyValue} label={emptyLabel} />
        );
    }

    renderItems() {
        const { itemValue, itemLabel } = this.props;

        const mapFunc = (item, index) => {
            const key = item[itemValue] || index;
            const label = item[itemLabel] || '-- invalid label --';
            return <Picker.Item key={key} value={key} label={label} />;
        };

        return [this.emptyItem].concat(this.props.items.map(mapFunc));
    }

    render() {
        const { iosHeader, value, onChange, label } = this.props;
        return (
          <View style={styles.picker}>
            <Item>
              <Text style={styles.itemLabel}>
                {label}
              </Text>
              <Picker
                ref={ref => (this._root = ref)}
                iosHeader={iosHeader}
                mode="dialog"
                selectedValue={value}
                onValueChange={onChange}
                style={{ flex: 1 }}
              >
                {this.renderItems()}
              </Picker>
            </Item>
          </View>
        );
    }
}

const styles = {
    itemLabel: {
        color: '#999',
    },
    picker: {
        paddingHorizontal: 15,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0E0E0',
        borderRadius: 2,
        marginTop: 5,
    },
    itemValue: {
        color: '#000',
        fontWeight: 'bold',
    },
};
