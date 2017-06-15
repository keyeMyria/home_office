import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, NumericField } from '../../../components/fields';
import SetDateForClassScreen from './SetDateForClassScreen';
import SelectQuestionScreen from './SelectQuestionScreen';

@observer
class ExerciseConfigurationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      setDateForClassScreenVisible: false,
      selectQuestionScreenVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  showSelectQuestionScreen = () => this.setState({ selectQuestionScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });
  hideSelectQuestionScreen = () => this.setState({ selectQuestionScreenVisible: false });

  render() {

    const quetionDatabaseTypeItems = store.quetionDatabaseTypes.map((type, index) =>
      <Picker.Item key={index} label={type.name} value={type.id} />
    );

    const questionGenerationTypeItems = store.questionGenerationTypes.map((type, index) =>
      <Picker.Item key={index} label={type.name} value={type.id} />
    );

    const questionGenerationTypeId = this.props.questionGenerationTypeId || store.questionGenerationTypes[0].id;
    const showNextScreen = questionGenerationTypeId === 3 ? this.showSelectQuestionScreen : this.showSetDateForClassScreen;

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
              <Title>Exercícios</Title>
            </Body>
            <Right>
              <TouchableWithoutFeedback onPress={showNextScreen}>
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
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
        <SelectQuestionScreen
          visible={this.state.selectQuestionScreenVisible}
          hideModal={this.hideSelectQuestionScreen} />
      </Modal>
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