import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Form, Text } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { DatePickerField } from '../../../components/fields';

@observer
class ExerciseScreen extends Component {

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
              <Title>Marcação</Title>
            </Body>
            <Right>
              <TouchableWithoutFeedback onPress={this.save}>
                <Text>Salvar</Text>
              </TouchableWithoutFeedback>
            </Right>
          </Header>
          <Content>
            <Form>
              <Field
                name="todasTurmas"
                label="Todas Turmas"
                component={DatePickerField}
                props={{ initialValue: new Date() }} />
              {store.schoolYearSelected.classes.map((schoolYear, index) =>
                <Field key={index}
                  name={schoolYear.key}
                  label={schoolYear.name}
                  component={DatePickerField}
                  props={{ initialValue: new Date() }} />
              )}
            </Form>
          </Content>
        </Container>
      </Modal>
    );
  }
}

export default reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);