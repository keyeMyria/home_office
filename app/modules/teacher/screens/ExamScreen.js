import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Text, Item, ListItem, CheckBox, Label } from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';
import SetDateForClassScreen from './SetDateForClassScreen';

@observer
class ExamScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { setDateForClassScreenVisible: false };
  }
  
  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });

  checkUncheckTopic = (checked, topicId) => {
    checked ?
      store.uncheckExamTopic(topicId) :
      store.checkExamTopic(topicId);
  }

  render() {

    const { navigate } = this.props.navigation;

    const subjectAreaItems = store.teacher.subjectAreas.map((subject, index) =>
      <Picker.Item key={index} label={subject.name} value={subject.id} />
    );

    let subjectAreas = store.teacher.subjectAreas.filter(subject => subject.id === this.props.subjectAreaId);
    const topics = subjectAreas.length > 0 ? subjectAreas[0].topics : store.teacher.subjectAreas[0].topics;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Provas</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.showSetDateForClassScreen}>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <BubbleMenu mode="schoolYear" />
          <Content padder>
            <Field
              name="disciplina"
              label="Disciplina"
              component={PickerField}
              props={{ initialValue: 1 }}>
              {subjectAreaItems}
            </Field>
            <Item stackedLabel style={{ borderBottomWidth: 0 }}>
              <Label>Selecione os Tópicos</Label>
            </Item>
          </Content>
          {topics.map((topic, index) => {
            const checked = store.examTopics.filter(topicId => topicId === topic.id).length > 0;
            return (
              <ListItem key={index}
                onPress={() => this.checkUncheckTopic(checked, topic.id)}>
                <Body>
                  <Text>{topic.name}</Text>
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
        </Content>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
      </Container>
    );
  }
}

const form = reduxForm({ form: 'formExamScreen' })(ExamScreen);
const selector = formValueSelector('formExamScreen');
export default connect(
  state => {
    return {
      subjectAreaId: selector(state, 'disciplina')
    };
  }
)(form);