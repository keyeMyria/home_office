import React from 'react';
import { View, Dimensions } from 'react-native';
import { Picker, Item, Label, Text } from 'native-base';

export default (props) => {
    const { input, label, initialValue, children, ...custom } = props;

    return (
      <View>
        <Item stackedLabel style={styles.itemLabel}>

        </Item>
        <Item inlineLabel style={styles.item}>
          {/*<Text>{label}</Text>*/}
          <Label>{label}</Label>
          <View style={{ flex: 1 }} />
          <Picker
            iosHeader="Selecione"
            mode="dialog"
            selectedValue={input.value || initialValue}
            onValueChange={value => input.onChange(value)}
            style={styles.picker}
            {...custom}
          >
            {children}
          </Picker>
        </Item>
      </View>
    );
};

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
        width: Dimensions.get('window').width - 22,
    },
};
