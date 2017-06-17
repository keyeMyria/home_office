import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal, View } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'underscore';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField } from '../../../components/fields';
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

    const questionCountItems = _.range(0, 51, 1).map((val, index) => {
      const label = val === 0 ? 'Nenhuma' : val + (val === 1 ? ' Questão' : ' Questões');
      return (
        <Picker.Item key={index} label={label} value={val + 1} />
      );
    });

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
          <Content padder>
            <Field
              name="bancoQuestoes"
              label="Banco de Questões"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {quetionDatabaseTypeItems}
            </Field>
            <Field
              name="modoGeracao"
              label="Modo de Geração"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {questionGenerationTypeItems}
            </Field>
            {questionGenerationTypeId !== 3 &&
              <View>
                <Field
                  name="numQuestoesFaceis"
                  label="Fáceis"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
                <Field
                  name="numQuestoesMedias"
                  label="Médios"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
                <Field
                  name="numQuestoesDificeis"
                  label="Difíceis"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
              </View>
            }
          </Content>
        </Container>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
        <SelectQuestionScreen
          visible={this.state.selectQuestionScreenVisible}
          hideModal={this.hideSelectQuestionScreen} />
      </Modal >
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