// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import _ from 'lodash';

const None = '-- None --';

@observer
export default class SegmentedControl extends Component {
    props: {
        items: Array<[number | string, string]>,
        store: Object,
        storeKey: string,
    };

    /**
     * Get the value from store
     */
    getValueFromStore(): string {
        const { store, storeKey } = this.props;
        const value = _.get(store, storeKey);
        return value;
    }

    /**
     * Update the value in store
     */
    updateValue = (val: string | number) => {
        const { store, storeKey } = this.props;
        if (val === None) {
            _.set(store, storeKey, undefined);
        } else {
            _.set(store, storeKey, val);
        }
    };

    getButtonStyle(active: boolean, index: number, array: Array<[number | string, string]>) {
        const isFirst = index === 0;
        const isLast = index === array.length - 1;

        const baseStyle = styles.buttonStyle;
        const aditional = active ? styles.buttonActive : styles.buttonInactive;
        const styleFirst = isFirst ? styles.buttonFirst : {};
        const styleLast = isLast ? styles.buttonLast : {};

        return {
            ...baseStyle,
            ...aditional,
            ...styleFirst,
            ...styleLast,
        };
    }

    mapItems(
        item: [number | string, string],
        index: number,
        array: Array<[number | string, string]>,
    ) {
        const [key, value] = item;
        const active = key === this.getValueFromStore();
        const onPress = () => this.updateValue(key);
        const style = this.getButtonStyle(active, index, array);
        return (
          <Button key={key} onPress={onPress} style={style}>
            <Text style={styles.textStyle}>{value}</Text>
          </Button>
        );
    }

    render() {
        const { items } = this.props;
        return <View style={styles.buttonView}>{items.map(this.mapItems, this)}</View>;
    }
}

const styles = {
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    textStyle: {
        fontSize: 12,
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    buttonStyle: {
        borderColor: '#477ca7',
        borderRadius: 0,
        borderWidth: 1,
        backgroundColor: '#477ca7',
        justifyContent: 'center',
        marginBottom: 10,
        flex: 1,
    },
    buttonFirst: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    buttonLast: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonActive: {
        borderColor: '#008dfd',
        backgroundColor: '#008dfd',
    },
    buttonInactive: {},
};
