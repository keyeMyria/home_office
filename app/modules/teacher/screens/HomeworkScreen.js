import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Form, Text } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { PickerField, TextField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';
import SetDateForClassScreen from './SetDateForClassScreen';

@observer
class HomeworkScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { setDateForClassScreenVisible: false };
  }

  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });

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
            <Title>Trabalhos</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.showSetDateForClassScreen}>
              <Text>Próximo</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
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
              style={{ height: 150 }}
              name="information"
              label="Informação"
              component={TextField}
              multiline={true}>
            </Field>
          </Form>
        </Content>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
      </Container>
    );
  }
}

export default reduxForm({ form: 'formHomeworkScreen' })(HomeworkScreen);