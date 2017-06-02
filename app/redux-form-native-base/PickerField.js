import React from 'react';
import { View } from 'react-native';
import { Picker, Item, Text, Label, Icon } from 'native-base';

export default ({ input, label, meta: { touched, error }, children, ...custom }) => {
  var hasError = !!error && touched;
  var isSuccess = !hasError && touched;
  return (
    <View>
      <Item error={hasError} success={isSuccess} inlineLabel>
        <Label>{label}</Label>
        <Picker
          supportedOrientations={['portrait', 'landscape']}
          iosHeader="Selecione"
          mode="dropdown" 
          selectedValue={input.value}
          onValueChange={value => input.onChange(value)}
          {...custom}>
          {children}
        </Picker>
        {hasError && <Icon name='close' />}
        {isSuccess && <Icon name='check' />}
      </Item>
      {hasError && <Text>{error}</Text>}
    </View>
  );
};


