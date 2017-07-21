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
    Picker,
    Text,
} from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

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
        this.showSetDateForClassScreen = this.showSetDateForClassScreen.bind(this);
        this.hideSetDateForClassScreen = this.hideSetDateForClassScreen.bind(this);
    }

    showSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: true });
    }

    hideSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: false });
    }

    getSubjectAreaItems() {
        const mapFunc = (subject, index) =>
          <Picker.Item key={index} label={subject.name} value={subject.id} />;
        return store.teacher.subjectAreas.map(mapFunc);
    }

    getGradesItems() {
        const mapFunc = (grade, index) =>
          <Picker.Item key={index} label={`${grade} Pontos`} value={grade} />;
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mapFunc);
    }

    getPeriodItems() {
        const mapFunc = (period, index) =>
          <Picker.Item key={index} label={period.name} value={period.id} />;
        return store.periods.map(mapFunc);
    }

    render() {
        const { navigate } = this.props.navigation;

        const subjectAreaItems = this.getSubjectAreaItems();
        const gradesItems = this.getGradesItems();
        const periodItems = this.getPeriodItems();

        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
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
              <Content padder>
                <Field
                  name="disciplina"
                  label="Disciplina"
                  component={PickerField}
                  props={{ initialValue: 1 }}
                >
                  {subjectAreaItems}
                </Field>
                <Field
                  name="bimestre"
                  label="Bimestre"
                  component={PickerField}
                  props={{ initialValue: 1 }}
                >
                  {periodItems}
                </Field>
                <Field
                  name="valor"
                  label="Pontuação"
                  component={PickerField}
                  props={{ initialValue: 10 }}
                >
                  {gradesItems}
                </Field>
                <Field
                  style={{ height: 150 }}
                  name="detalhes"
                  label="Descrição da Atividade"
                  component={TextField}
                  multiline
                />
              </Content>
            </Content>
            <SetDateForClassScreen
              visible={this.state.setDateForClassScreenVisible}
              hideModal={this.hideSetDateForClassScreen}
              screenFormValues={this.props.formValues}
            />
          </Container>
        );
    }
}

// Pass form data to props
HomeworkScreenForm = reduxForm({ form: 'formHomeworkScreen' })(HomeworkScreen);
const selector = formValueSelector('formHomeworkScreen');
export default connect(
  state => ({
    formValues: {
      disciplina: selector(state, 'disciplina'),
      bimestre: selector(state, 'bimestre'),
      valor: selector(state, 'valor'),
      detalhes: selector(state, 'detalhes'),
    },
  })
)(HomeworkScreenForm);
