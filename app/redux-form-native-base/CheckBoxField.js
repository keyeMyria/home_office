import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CheckBox, Text } from 'native-base';

export default ({ input: { onChange, checked }, label }) => {
  console.log('checked', checked);
  return (
    <TouchableWithoutFeedback onPress={() => onChange(!checked)}>
      <View>
        <CheckBox checked={!!checked} />
        <Text>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};