import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Form, Text } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { DatePickerField } from '../../../components/fields';

@observer
class ExerciseScreen extends Component {

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    this.props.navigation.goBack();
  }

  render() {

    const { goBack } = this.props.navigation;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => goBack()}>
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
    );
  }
}

export default reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);