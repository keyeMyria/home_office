import React from 'react';
import { View } from 'react-native';
import { Picker, Item, Label, Icon } from 'native-base';

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
        {hasError && <Icon name='error' style={{ flex: 1, alignSelf: 'flex-end' }}/>}
        {isSuccess && <Icon name='check-circle' />}
      </Item>
      {/*{hasError && <Text>{error}</Text>}*/}
    </View>
  );
};


