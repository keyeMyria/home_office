import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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
  Toast,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class OccurrenceScreen extends Component {

  save = () => {
    Toast.show({
      text: 'Dados salvos com sucesso!',
      type: 'success',
      position: 'bottom',
      buttonText: 'OK'
    });
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Ocorrências</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.save}>
              <Icon name="save" />
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <List>
            {store.students.map((student, index) => {
              const checked = store.absenses.filter(studentId => studentId === student.id).length > 0;
              return (
                <ListItem key={index} icon
                  onPress={() => checked ? store.uncheckStudentAbsense(student.id) : store.checkStudentAbsense(student.id)}>
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