import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Content, Button, Text, Picker, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from './store';

import { TextField, CheckBoxField, PickerField } from './redux-form-native-base';

var width = Dimensions.get('window').width;

const validate = values => {
  const error = {};
  if (!values.email) {
    error.email = 'required field';
  }
  if (!values.name) {
    error.name = 'required field';
  }
  if (!values.selectVehicle) {
    error.selectVehicle = 'required field';
  }
  return error;
};

@observer
class Planejamento extends Component {

  submit = values => {
    console.log('submitting form', values);
  }

  render() {
    return (
      <Content padder>
        <Field name="email" label="Email" component={TextField} />
        <Field name="name" label="Name" component={TextField} />
        {/*<Field name="test" label="Is Test?" component={CheckBox} />*/}
        <Field name="selectVehicle" label="Vehicle" component={PickerField} style={{ width: 200 }}>
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Bus" value="Bus" />
          <Picker.Item label="Bajaji" value="Bajaji" />
          <Picker.Item label="Motorbike" value="Motobike" />
          <Picker.Item label="Camel" value="Camel" />
        </Field>
        <Button block primary onPress={this.props.handleSubmit(this.submit)} style={{ marginTop: 20 }}>
          <Text>Submit</Text>
        </Button>
      </Content>
    );
  }
}

export default reduxForm({ form: 'formPlanejamento', validate })(Planejamento);