// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import SelectButton from './SelectButton';

type ItemType = {
    key: string | number, // eslint-disable-line react/no-unused-prop-types
    value: string, // eslint-disable-line react/no-unused-prop-types
    active: boolean, // eslint-disable-line react/no-unused-prop-types
};

@observer
export default class MultipleSelectButton extends Component {

    props: {
        items: Array<ItemType>,
        onChange: (key: string | number, active: boolean) => void,
    };

    mapItems({ key, value, active }: ItemType) {
        const { onChange } = this.props;
        const onPress = () => onChange(key, !active);
        return (
          <SelectButton key={key} text={value} onPress={onPress} active={active} />
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
        flexWrap: 'wrap',
    },
};
