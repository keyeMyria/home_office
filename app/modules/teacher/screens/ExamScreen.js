import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text, Item, ListItem, CheckBox } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';

@observer
class ExamScreen extends Component {

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
            <Item style={{ height: 46, borderWidth: 0 }}>
              <Text>Selecione o(s) assunto(s)</Text>
            </Item>
          </Form>
          {store.teacher.subjectAreas[0].topics.map((topic, index) => {
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
      </Container>
    );
  }
}

export default reduxForm({ form: 'formExamScreen' })(ExamScreen);