import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content, Text, Picker } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

import { TextField, CheckBoxField, PickerField } from './redux-form-native-base';

import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const error = {};
  error.email = '';
  error.name = '';
  var ema = values.email || '';
  var nm = values.name || '';
  var p = values.selectVehicle || '';
  if (!ema) {
    error.email = 'required field';
  }
  if (!nm) {
    error.name = 'required field';
  }
  if (!p) {
    error.selectVehicle = 'required field';
  }
  if (ema.length < 8 && ema !== '') {
    error.email = 'too short';
  }
  if (!ema.includes('@') && ema !== '') {
    error.email = '@ not included';
  }
  if (nm.length > 8) {
    error.name = 'max 8 characters';
  }
  return error;
};

@observer
class Mensagens extends Component {

  submit = values => {
    console.log('submitting form', values);
  }

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => store.openDrawer()}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Field name="email" label="Email" component={TextField} />
          <Field name="name" label="Name" component={TextField} />
          {/*<Field name="test" label="Is Test?" component={CheckBox} />*/}
          <Field name="selectVehicle" label="Vehicle" component={PickerField}>
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Car" value="Car" />
            <Picker.Item label="Bus" value="Bus" />
            <Picker.Item label="Bajaji" value="Bajaji" />
            <Picker.Item label="Motorbike" value="Motobike" />
            <Picker.Item label="Camel" value="Camel" />
          </Field>
          <Button block primary onPress={this.props.handleSubmit(this.submit)}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({ form: 'formMensagens', validate })(Mensagens);