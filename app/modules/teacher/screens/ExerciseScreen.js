import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';
import SetDateForClassScreen from './SetDateForClassScreen';
import ExerciseConfigurationScreen from './ExerciseConfigurationScreen';

@observer
class ExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      setDateForClassScreenVisible: false,
      exerciseConfigurationScreenVisible: false,
    };
  }

  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  showExerciseConfigurationScreen = () => this.setState({ exerciseConfigurationScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });
  hideExerciseConfigurationScreen = () => this.setState({ exerciseConfigurationScreenVisible: false });

  render() {

    const { navigate } = this.props.navigation;

    const exerciceTypeItems = store.exerciceTypes.map((type, index) =>
      <Picker.Item key={index} label={type.name} value={type.id} />
    );

    const subjectAreaItems = store.teacher.subjectAreas.map((subject, index) =>
      <Picker.Item key={index} label={subject.name} value={subject.id} />
    );

    const timeItems = store.planningTimes.map((time, index) =>
      <Picker.Item key={index} label={time.label} value={time.id} />
    );

    const exerciseTypeId = this.props.exerciseTypeId || store.exerciceTypes[0].id;
    const showNextScreen = exerciseTypeId === 1 ? this.showSetDateForClassScreen : this.showExerciseConfigurationScreen;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
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
          <BubbleMenu mode="schoolYear" />
          <Form>
            <Field
              name="tipo"
              label="Tipo"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {exerciceTypeItems}
            </Field>
            <Field
              name="disciplina"
              label="Disciplina"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {subjectAreaItems}
            </Field>
            <Field
              name="tempoAproximado"
              label="Tempo Aproximado"
              component={PickerField}
              props={{ initialValue: 0 }}>
              {timeItems}
            </Field>
            <Field
              style={{ height: 150 }}
              name="information"
              label="Informação"
              component={TextField}
              multiline={true}>
            </Field>
          </Form>
        </Content>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
        <ExerciseConfigurationScreen
          visible={this.state.exerciseConfigurationScreenVisible}
          hideModal={this.hideExerciseConfigurationScreen} />
      </Container>
    );
  }
}

const form = reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);
const selector = formValueSelector('formExerciseScreen');
export default connect(
  state => {
    return {
      exerciseTypeId: selector(state, 'tipo')
    };
  }
)(form);