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
export default class AbsenseScreen extends Component {

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  }

  checkUncheckStudentAbsense = (checked, studentId) => {
    checked ?
      store.uncheckStudentAbsense(studentId) :
      store.checkStudentAbsense(studentId);
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
            <Title>Faltas</Title>
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
              const checked = store.absenses.filter(studentId => studentId === student.id).length > 0;
              return (
                <ListItem key={index} icon
                  onPress={() => this.checkUncheckStudentAbsense(checked, student.id)}>
                  <Left>
                    <Thumbnail small source={store.getStudentImagebyId(student.id)} />
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