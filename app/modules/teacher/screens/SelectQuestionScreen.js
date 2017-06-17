import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, CheckBox, List, ListItem } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import SetDateForClassScreen from './SetDateForClassScreen';

@observer
export default class SelectQuestionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      setDateForClassScreenVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });

  checkUncheckExerciceQuestion = (checked, questionId) => {
    checked ?
      store.uncheckExerciceQuestion(questionId) :
      store.checkExerciceQuestion(questionId);
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
              <Title>Questões</Title>
            </Body>
            <Right>
              <TouchableWithoutFeedback onPress={this.showSetDateForClassScreen}>
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
                    style={{
                      backgroundColor: question.colorLevel,
                      marginLeft: 0
                    }}
                    onPress={() => this.checkUncheckExerciceQuestion(checked, question.id)}>
                    <Body>
                      <Text>{question.name}</Text>
                    </Body>
                    <Right>
                      <CheckBox
                        checked={checked}
                        style={{ marginRight: 20, ... !checked ? { backgroundColor: '#FFFFFF' } : null }}
                      />
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          </Content>
        </Container>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
      </Modal>
    );
  }
}