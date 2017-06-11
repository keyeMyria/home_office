import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, Picker, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

@observer
class OccurrenceReasonScreen extends Component {

  render() {

    const { goBack } = this.props.navigation;
    
    const pickerItems = store.occurrenceReasons.map((reason, index) =>
      <Picker.Item key={index} label={reason.name} value={reason.id} />
    );

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Icon name='arrow-back' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Ocorrência</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Text>OK</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <Form>
            <Field
              name="motivo"
              label="Motivo"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {pickerItems}
            </Field>
            <Field
              style={{ height: 150 }}
              name="observacao"
              label="Observação"
              component={TextField}
              multiline={true}>
            </Field>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({ form: 'formOccurrenceReasonScreen' })(OccurrenceReasonScreen);