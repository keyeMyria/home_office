import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, Thumbnail, CheckBox, List, ListItem } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import OccurrenceReasonScreen from './OccurrenceReasonScreen';

@observer
export default class OccurrenceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      occurrenceReasonScreenVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  showOccurrenceReasonScreen = () => this.setState({ occurrenceReasonScreenVisible: true });
  hideOccurrenceReasonScreen = () => this.setState({ occurrenceReasonScreenVisible: false });

  save = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
      { text: 'OK', onPress: this.props.hideModal }
    ]);
  }

  checkUncheckStudentOccurrence = (checked, studentId) => {
    if (checked) {
      store.uncheckStudentOccurrence(studentId);
    }
    else {
      store.checkStudentOccurrence(studentId);
      this.showOccurrenceReasonScreen();
    }
  }

  render() {

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
                    onPress={() => this.checkUncheckStudentOccurrence(checked, student.id)}>
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
        <OccurrenceReasonScreen
          visible={this.state.occurrenceReasonScreenVisible}
          hideModal={this.hideOccurrenceReasonScreen} />
      </Modal>
    );
  }
}