import React from 'react';
import { View } from 'react-native';
import { Picker, Item, Label } from 'native-base';

export default ({ input, label, initialValue, children, ...custom }) => {
  return (
    <View>
      <Item inlineLabel>
        <Label style={{ flex: 0.4 }}>{label}</Label>
        <Picker
          iosHeader="Selecione"
          mode="dropdown"
          selectedValue={input.value || initialValue}
          onValueChange={value => input.onChange(value)}
          style={{ flex: 0.6 }}
          {...custom}>
          {children}
        </Picker>
      </Item>
    </View>
  );
};


