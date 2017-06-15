import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, Picker, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

@observer
class OccurrenceReasonScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
      { text: 'OK', onPress: this.props.hideModal }
    ]);
  }

  render() {

    const pickerItems = store.occurrenceReasons.map((reason, index) =>
      <Picker.Item key={index} label={reason.name} value={reason.id} />
    );

    return (
      <Modal animationType={'slide'} transparent={false} visible={this.state.visible}>
        <Container>
          <Header appHeader>
            <Left>
              <TouchableWithoutFeedback onPress={this.props.hideModal}>
                <Icon name='arrow-back' />
              </TouchableWithoutFeedback>
            </Left>
            <Body>
              <Title>Ocorrência</Title>
            </Body>
            <Right>
              <TouchableWithoutFeedback onPress={this.save}>
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
      </Modal>
    );
  }
}

export default reduxForm({ form: 'formOccurrenceReasonScreen' })(OccurrenceReasonScreen);