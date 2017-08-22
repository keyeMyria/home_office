// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Item, Label } from 'native-base';
import type { ObservableMap } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from 'lodash';
import type BaseModel from './../../lib/models/BaseModel';

@observer
export default class ForeignKeyField extends Component {
    props: {
        label: string,
        items: ObservableMap<BaseModel>,
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
        return String((value && value.pk) || 'nil');
    }

    /**
     * Update the value in store
     */
    updateValue = (val: string) => {
        const { store, storeKey, items } = this.props;
        const value = items.get(val);
        _.set(store, storeKey, value);
    };

    renderPickerItems() {
        const { items, placeholder } = this.props;
        const entries = items
            .entries()
            .map(([key, model]) => <Picker.Item key={key} value={key} label={model.toString()} />);
        if (placeholder && entries.length) {
            return [<Picker.Item key="nil" value="nil" label={placeholder} />].concat(...entries);
        }
        return entries;
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
            <Picker
              selectedValue={this.getValueFromStore()}
              onValueChange={this.updateValue}
              style={styles.picker}
              {...this.getPickerProps()}
            >
              {this.renderPickerItems()}
            </Picker>
          </View>
        );
    }
}

export function createForeignKeyField(
    label: string,
    items: ObservableMap<*>,
    store: *,
    storeKey: string,
    options?: *,
) {
    return (
      <ForeignKeyField
        label={label}
        store={store}
        items={items}
        storeKey={storeKey}
        {...options}
      />
    );
}

const styles = {
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        borderBottomWidth: 0,
        backgroundColor: 'white',
    },
    itemLabel: {
        borderBottomWidth: 0,
    },
    picker: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: 7,
    },
};
