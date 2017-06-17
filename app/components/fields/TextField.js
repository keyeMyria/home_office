import React from 'react';
import { View } from 'react-native';
import { Input, Item, Label } from 'native-base';

export default (props) => {

  const { input, label, ...custom } = props;
  custom.style = { ...custom.style, ...styles.input };

  return (
    <View>
      <Item stackedLabel style={styles.itemLabel}>
        <Label>{label}</Label>
      </Item>
      <Item style={styles.item}>
        <Input placeholder="Digite aqui..." {...input} {...custom} />
      </Item>
    </View>
  );
};

const styles = {
  item: {
    marginTop: 5,
    borderBottomWidth: 0,
  },
  itemLabel: {
    borderBottomWidth: 0,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 2,
  }
};