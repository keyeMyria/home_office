// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { observer } from 'mobx-react/native';

type ItemType = {
    key: string | number, // eslint-disable-line
    value: string, // eslint-disable-line
};

@observer
export default class SegmentedControl extends Component {
    props: {
        items: Array<ItemType>,
        selected: string | number,
        onChange: (key: string | number) => void,
    };

    getButtonStyle(active: boolean, index: number, array: Array<ItemType>) {
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

    mapItems({ key, value }: ItemType, index: number, array: Array<ItemType>) {
        const { onChange } = this.props;
        const active = key === this.props.selected;
        const onPress = () => onChange(key, !active);
        const style = this.getButtonStyle(active, index, array);
        return (
          <Button key={key} onPress={onPress} style={style}>
            <Text style={styles.textStyle}>
              {value}
            </Text>
          </Button>
        );
    }

    render() {
        const { items } = this.props;

        return (
          <View style={styles.buttonView}>
            {items.map(this.mapItems, this)}
          </View>
        );
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
    },
    buttonStyle: {
        borderColor: '#20a3b2',
        borderRadius: 0,
        borderWidth: 1,
        backgroundColor: '#b5b5b5',
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
        backgroundColor: '#26C6DA',
    },
    buttonInactive: {},
};
