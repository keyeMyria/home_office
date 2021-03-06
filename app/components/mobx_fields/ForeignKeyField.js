// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker, Text } from 'native-base';
import type { ObservableMap } from 'mobx';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

@observer
export default class ForeignKeyField extends Component {
    props: {
        label: string,
        items: ObservableMap<*>,
        store: *,
        placeholder: string,
        storeKey: string,
        iosHeader: string,
        headerBackButtonText: string,
        mode: string,
        emptyLabel: string,
    };

    static defaultProps = {
        iosHeader: 'Selecione',
        headerBackButtonText: 'Voltar',
        mode: 'dialog',
        placeholder: 'Selecione',
        emptyLabel: '',
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
        const { items, emptyLabel } = this.props;
        const entries = items
            .entries()
            .map(([key, model]) => <Picker.Item key={key} value={key} label={model.toString()} />);

        if (entries.length && emptyLabel) {
            return [<Picker.Item key="nil" value="nil" label={emptyLabel} />].concat(...entries);
        }

        return entries;
    }

    render() {
        const { label } = this.props;

        return (
          <View style={styles.container}>
            <Text style={styles.itemLabel}>{label}</Text>
            <Picker
              selectedValue={this.getValueFromStore()}
              onValueChange={this.updateValue}
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
        color: '#999',
    },
    container: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'space-between',
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#fff',
        marginTop: 7,
        paddingLeft: 16,
    },
    picker: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: '#fff',
    },
};
