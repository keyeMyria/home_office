import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal, View } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Picker, Text, Button, Item, Label } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import _ from 'underscore';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import { PickerField } from '../../../components/fields';
import SetDateForClassScreen from './SetDateForClassScreen';
import SelectQuestionScreen from './SelectQuestionScreen';

@observer
class ExerciseConfigurationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      setDateForClassScreenVisible: false,
      selectQuestionScreenVisible: false,
      questionGenerationTypeId: 1,
      questionDatabaseTypeId: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  showSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: true });
  showSelectQuestionScreen = () => this.setState({ selectQuestionScreenVisible: true });
  hideSetDateForClassScreen = () => this.setState({ setDateForClassScreenVisible: false });
  hideSelectQuestionScreen = () => this.setState({ selectQuestionScreenVisible: false });

  render() {

    const questionCountItems = _.range(0, 51, 1).map((val, index) => {
      const label = val === 0 ? 'Nenhuma' : val + (val === 1 ? ' Questão' : ' Questões');
      return (
        <Picker.Item key={index} label={label} value={val + 1} />
      );
    });

    const questionGenerationTypeId = this.state.questionGenerationTypeId || store.questionGenerationTypes[0].id;
    const showNextScreen = questionGenerationTypeId === 3 ? this.showSelectQuestionScreen : this.showSetDateForClassScreen;

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
              <Title>Exercícios</Title>
            </Body>
            <Right>
              <TouchableWithoutFeedback onPress={showNextScreen}>
                <Text>Próximo</Text>
              </TouchableWithoutFeedback>
            </Right>
          </Header>
          <Content padder>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Banco de Questões</Label>
            </Item>
            <View style={styles.buttonView}>
              {store.questionDatabaseTypes.map((type, index) =>
                <Button key={index} rounded
                  onPress={() => this.setState({ questionDatabaseTypeId: type.id })}
                  style={type.id === this.state.questionDatabaseTypeId ? styles.buttonActive : styles.buttonInactive}>
                  <Text>{type.name}</Text>
                </Button>
              )}
            </View>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Modo de Geração</Label>
            </Item>
            <View style={styles.buttonView}>
              {store.questionGenerationTypes.map((type, index) =>
                <Button key={index} rounded
                  onPress={() => this.setState({ questionGenerationTypeId: type.id })}
                  style={type.id === this.state.questionGenerationTypeId ? styles.buttonActive : styles.buttonInactive}>
                  <Text>{type.name}</Text>
                </Button>
              )}
            </View>
            {questionGenerationTypeId !== 3 &&
              <View>
                <Field
                  name="numQuestoesFaceis"
                  label="Fáceis"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
                <Field
                  name="numQuestoesMedias"
                  label="Médios"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
                <Field
                  name="numQuestoesDificeis"
                  label="Difíceis"
                  component={PickerField}
                  props={{ initialValue: 1 }}>
                  {questionCountItems}
                </Field>
              </View>
            }
          </Content>
        </Container>
        <SetDateForClassScreen
          visible={this.state.setDateForClassScreenVisible}
          hideModal={this.hideSetDateForClassScreen} />
        <SelectQuestionScreen
          visible={this.state.selectQuestionScreenVisible}
          hideModal={this.hideSelectQuestionScreen} />
      </Modal >
    );
  }
}

export default reduxForm({ form: 'formExerciseConfigurationScreen' })(ExerciseConfigurationScreen);