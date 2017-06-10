import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Text,
  Thumbnail,
  CheckBox,
  List,
  ListItem,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class OccurrenceScreen extends Component {

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    this.props.navigation.goBack();
  }

  checkUncheckStudentOccurrence = (checked, studentId, navigate) => {
    if (checked) {
      store.uncheckStudentOccurrence(studentId);
    }
    else {
      store.checkStudentOccurrence(studentId);
      navigate('OccurrenceReasonScreen');
    }
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
            <Title>Ocorrências</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.save}>
              <Text>Salvar</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <List>
            {store.students.map((student, index) => {
              const checked = store.occurrences.filter(studentId => studentId === student.id).length > 0;
              return (
                <ListItem key={index} icon
                  onPress={() => this.checkUncheckStudentOccurrence(checked, student.id, navigate)}>
                  <Left>
                    <Thumbnail small source={require('../../../img/user.png')} />
                  </Left>
                  <Body>
                    <Text>{student.name}</Text>
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