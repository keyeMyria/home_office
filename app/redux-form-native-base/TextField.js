import React from 'react';
import { View } from 'react-native';
import { Input, Item, Text, Label, Icon } from 'native-base';

export default ({ input, label, meta: { touched, error }}) => {
  var hasError = !!error && touched;
  var isSuccess = !hasError && touched;
  return (
    <View>
      <Item error={hasError} success={isSuccess} inlineLabel>
        <Label>{label}</Label>
        <Input {...input} />
        {hasError && <Icon name='close' />}
        {isSuccess && <Icon name='check' />}
      </Item>
      {hasError && <Text>{error}</Text>}
    </View>
  );
};