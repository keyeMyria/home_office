import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, CheckBox, List, ListItem } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class SelectQuestionScreen extends Component {

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  }

  checkUncheckExerciceQuestion = (checked, questionId) => {
    checked ?
      store.uncheckExerciceQuestion(questionId) :
      store.checkExerciceQuestion(questionId);
  }

  render() {

    const { navigate, goBack } = this.props.navigation;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => goBack()}>
              <Icon name='arrow-back' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Questões</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={() => navigate('SetDateForClassScreen')}>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <List>
            {store.questions.map((question, index) => {
              const checked = store.exerciceQuestions.filter(questionId => questionId === question.id).length > 0;
              return (
                <ListItem key={index}
                  onPress={() => this.checkUncheckExerciceQuestion(checked, question.id)}>
                  <Body>
                    <Text>{question.name}</Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={checked}
                      style={{ marginRight: 20 }}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    );
  }
}