// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Item, Label } from 'native-base';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

@observer
export default class PickerField extends Component {
    props: {
        label: string,
        items: Array<[number | string, string]>,
        store: *,
        placeholder: string,
        storeKey: string,
        iosHeader: string,
        headerBackButtonText: string,
        mode: string,
    };

    static defaultProps = {
        iosHeader: 'Selecione',
        headerBackButtonText: 'Voltar',
        mode: 'dialog',
        placeholder: '-- Selecione --',
    };

    /**
     * Return all the extra props
     */
    getPickerProps() {
        const props = _.omit(this.props, ['label', 'store', 'storeKey', 'items']);
        props.style = { ...styles.picker, ...props.style };
        return props;
    }

    /**
     * Get the value from store
     */
    getValueFromStore(): string {
        const { store, storeKey } = this.props;
        const value = _.get(store, storeKey);
        return value || 'nil';
    }

    /**
     * Update the value in store
     */
    updateValue = (val: string) => {
        const { store, storeKey } = this.props;
        if (val === 'nil') {
            _.set(store, storeKey, undefined);
        } else {
            _.set(store, storeKey, val);
        }
    };

    renderPickerItems() {
        const { items, placeholder } = this.props;
        const entries = items.map(([key, label]) =>
          <Picker.Item key={key} value={key} label={label} />,
        );
        if (placeholder) {
            return [<Picker.Item key="nil" value="nil" label={placeholder} />].concat(...entries);
        }
        return entries;
    }

    renderPicker() {
        return (
          <Picker
            selectedValue={this.getValueFromStore()}
            onValueChange={this.updateValue}
            style={styles.picker}
            {...this.getPickerProps()}
          >
            {this.renderPickerItems()}
          </Picker>
        );
    }

    render() {
        const { label } = this.props;

        return (
          <View>
            <Item stackedLabel style={styles.itemLabel}>
              <Label>
                {label}
              </Label>
            </Item>
            <Item style={styles.item}>
              {this.renderPicker()}
            </Item>
          </View>
        );
    }
}

export function createPickerField(
    label: string,
    items: Array<[number | string, string]>,
    store: *,
    storeKey: string,
    options?: *,
) {
    return (
      <PickerField label={label} store={store} items={items} storeKey={storeKey} {...options} />
    );
}

const styles = {
    item: {
        marginTop: 5,
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF',
    },
    itemLabel: {
        borderBottomWidth: 0,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'stretch',
        flex: 1,
    },
};
