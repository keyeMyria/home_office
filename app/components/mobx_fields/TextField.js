// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Item, Label } from 'native-base';

import { observer } from 'mobx-react/native';
import _ from 'lodash';

@observer
export default class TextField extends Component {
    props: {
        label: string,
        store: *,
        storeKey: string,
        cast?: string => *,
        customInput: Class<Component<*, *, *>>,
        multiline?: boolean,
        icon: ?string;
    };

    static defaultProps = {
        placeholder: 'Digite aqui...',
        cast: val => val,
        customInput: Input,
        multiline: false,
        icon: null,
    };

    /**
     * Return all the extra props
     */
    getInputProps() {
        const props = _.omit(this.props, ['label', 'store', 'storeKey', 'cast']);
        props.style = { ...styles.input, ...props.style };
        if (props.multiline) {
            props.style = { ...props.style, height: 150 };
        }
        return props;
    }

    /**
     * Update the value in store
     */
    updateValue = (val: string) => {
        const { cast, store, storeKey } = this.props;
        const value = cast && _.isFunction(cast) ? cast(val) : val;
        _.set(store, storeKey, value);
    };

    /**
     * Get the value from store
     */
    getValueFromStore(): string {
        const { store, storeKey } = this.props;
        const value = _.get(store, storeKey);
        return value ? String(value) : '';
    }

    /**
     * Render's the input component
     */
    renderInput() {
        const { customInput: CustomInput } = this.props;
        return (
          <CustomInput
            onChangeText={this.updateValue}
            value={this.getValueFromStore()}
            {...this.getInputProps()}
          />
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
              {this.renderInput()}
            </Item>
          </View>
        );
    }
}

/**
 * Creates a TextFieldComponent
 */
export function createTextField(
    label: string,
    store: any,
    storeKey: string,
    options: { [string]: any } = {},
) {
    return <TextField store={store} storeKey={storeKey} label={label} {...options} />;
}

const styles = {
    item: {
        marginTop: 5,
        borderBottomWidth: 0,
    },
    itemLabel: {
        borderBottomWidth: 0,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
    },
};
