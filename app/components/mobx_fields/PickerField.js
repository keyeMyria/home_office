// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Item, Text } from 'native-base';
import { observer } from 'mobx-react/native';

import _ from 'lodash';

@observer
export default class PickerField extends Component {
    props: {
        name: string, // nome do campo
        label: string, // The label
        value: number | string, // The current value
        items: Array<Object>, // Array of options to render
        valKey: string, // Key usada para resgatar o valor item
        labelKey: string, // Key usada para resgatar o valor do label de cada item
        // assim como valKey, pode ser usada qualquer expressão aceita
        // pela função `get` do lodash
        placeholder: string, // Placeholder do campo
        placeholderValue: string | number, // Valor padrão do placeholder
        iosHeader: string, // Header exibido no select do iOS
        onChange: any => void, // Callback
    };

    static defaultProps = {
        valKey: 'id',
        labelKey: 'titulo',
        placeholder: '-- Selecione --',
        placeholderValue: 0,
        iosHeader: 'Selecione',
    };

    get emptyItem(): Picker.Item {
        const { placeholderValue, placeholder } = this.props;
        return <Picker.Item key={placeholderValue} value={placeholderValue} label={placeholder} />;
    }

    renderItems() {
        const { labelKey, valKey } = this.props;

        const mapFunc = (item, index) => {
            const key = _.get(item, valKey) || index + 1;
            const label = _.get(item, labelKey) || '-- invalid label --';
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
                ref={(ref) => {
                    this._root = ref;
                }}
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
