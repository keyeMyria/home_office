import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';

@observer
class ExerciseScreen extends Component {

  render() {

    const { navigate } = this.props.navigation;
    
    const subjectAreaItems = store.teacher.subjectAreas.map((subject, index) =>
      <Picker.Item key={index} label={subject.name} value={subject.id} />
    );

    const timeItems = store.planningTimes.map((time, index) =>
      <Picker.Item key={index} label={time.label} value={time.id} />
    );

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
            <TouchableWithoutFeedback onPress={() => navigate('SetDateForClassScreen')}>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content stickyHeaderIndices={[0]}>
          <BubbleMenu mode="schoolYear" />
          <Form>
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

export default reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);