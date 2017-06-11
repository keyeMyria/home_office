import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, NumericField } from '../../../components/fields';

@observer
class ExerciseConfigurationScreen extends Component {

  render() {

    const { navigate, goBack } = this.props.navigation;

    const quetionDatabaseTypeItems = store.quetionDatabaseTypes.map((type, index) =>
      <Picker.Item key={index} label={type.name} value={type.id} />
    );

    const questionGenerationTypeItems = store.questionGenerationTypes.map((type, index) =>
      <Picker.Item key={index} label={type.name} value={type.id} />
    );

    const questionGenerationTypeId = this.props.questionGenerationTypeId || store.questionGenerationTypes[0].id;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Icon name='arrow-back' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Exercícios</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={() =>
              questionGenerationTypeId === 3 ? navigate('SelectQuestionScreen') : navigate('SetDateForClassScreen')
            }>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <Form>
            <Field
              name="bancoQuestoes"
              label="Banco de Questões"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {quetionDatabaseTypeItems}
            </Field>
            <Field
              name="modoGeracao"
              label="Modo Geração"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {questionGenerationTypeItems}
            </Field>
            <Field
              name="numQuestoesFaceis"
              label="Fáceis"
              component={NumericField}>
            </Field>
            <Field
              name="numQuestoesMedias"
              label="Médios"
              component={NumericField}>
            </Field>
            <Field
              name="numQuestoesDificeis"
              label="Difíceis"
              component={NumericField}>
            </Field>
          </Form>
        </Content>
      </Container>
    );
  }
}

const form = reduxForm({ form: 'formExerciseConfigurationScreen' })(ExerciseConfigurationScreen);
const selector = formValueSelector('formExerciseConfigurationScreen');
export default connect(
  state => {
    return {
      questionGenerationTypeId: selector(state, 'modoGeracao')
    };
  }
)(form);