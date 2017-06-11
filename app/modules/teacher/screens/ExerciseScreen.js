import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';

@observer
class ExerciseScreen extends Component {

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
            <TouchableWithoutFeedback onPress={() =>
              exerciseTypeId === 1 ?
                navigate('SetDateForClassScreen') :
                navigate('ExerciseConfigurationScreen')
            }>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content stickyHeaderIndices={[0]}>
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