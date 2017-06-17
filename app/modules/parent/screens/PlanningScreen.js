import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Container, Header, Title, Content, Right, Left, Icon, Body, Text, Picker } from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import BubbleMenu from '../../../components/BubbleMenu';

import { PickerField } from '../../../components/fields';

// const validate = values => {
//   const error = {};
//   // TODO: Implementar validações
//   // if (!values.email) {
//   //   error.email = 'required field';
//   // }
//   // if (!values.name) {
//   //   error.name = 'required field';
//   // }
//   // if (!values.selectVehicle) {
//   //   error.selectVehicle = 'required field';
//   // }
//   return error;
// };

@observer
class PlanningScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    this.checkIfFormChanged();
  }

  componentDidMount() {
    this.checkIfFormChanged();
  }

  checkIfFormChanged = () => {
    // Reset form
    if (store.formChanged) {
      this.props.reset();
      store.toogleFormChanged();
    }
  }

  save = values => {
    store.saveStudentPlanning(values);
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  }

  render() {

    const { navigate } = this.props.navigation;
    const subjectAreas = store.studentSelected.subjectAreas.items;

    const pickerItems = store.planningTimes.map((time, index) =>
      <Picker.Item key={index} label={time.label} value={time.id} />
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
            <Title>Planejar</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.props.handleSubmit(this.save)}>
              <Text>Salvar</Text>
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Content>
          <BubbleMenu />
          <Content padder>
            {subjectAreas.map((subjectArea, index) => {
              const currentValue = store.studentSelected.planning[subjectArea.key] || 0;
              return (
                <Field key={index}
                  name={subjectArea.key}
                  label={subjectArea.name}
                  component={PickerField}
                  props={{ initialValue: currentValue }}>
                  {pickerItems}
                </Field>
              );
            })}
          </Content>
        </Content>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'formPlanningScreen',
  // validate
})(PlanningScreen);