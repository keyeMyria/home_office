import React from 'react';
import { View } from 'react-native';
import { Input, Item, Label, Icon } from 'native-base';

// TODO: Implementar o campo Text para os formulários

export default ({ input, label, meta: { touched, error }}) => {
  var hasError = !!error && touched;
  var isSuccess = !hasError && touched;
  return (
    <View>
      <Item error={hasError} success={isSuccess} inlineLabel>
        <Label>{label}</Label>
        <Input {...input} />
        {hasError && <Icon name='error' />}
        {isSuccess && <Icon name='check-circle' />}
      </Item>
      {/*{hasError && <Text>{error}</Text>}*/}
    </View>
  );
};