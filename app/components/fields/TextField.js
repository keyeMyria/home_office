import React from 'react';
import { View } from 'react-native';
import { Input, Item, Label } from 'native-base';

export default ({ input, label, ...custom }) => {
  return (
    <View>
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input {...input} {...custom} />
      </Item>
    </View>
  );
};