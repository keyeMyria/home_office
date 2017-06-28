import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
    Button,
    Item,
    Label,
} from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import { PickerField, TextField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';
import SetDateForClassScreen from './SetDateForClassScreen';
import ExerciseConfigurationScreen from './ExerciseConfigurationScreen';

@observer
class ExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setDateForClassScreenVisible: false,
            exerciseConfigurationScreenVisible: false,
            exerciseTypeId: 1,
        };

        this.showSetDateForClassScreen = this.showSetDateForClassScreen.bind(this);
        this.showExerciseConfigurationScreen = this.showExerciseConfigurationScreen.bind(this);
        this.hideSetDateForClassScreen = this.hideSetDateForClassScreen.bind(this);
        this.hideExerciseConfigurationScreen = this.hideExerciseConfigurationScreen.bind(this);
    }

    showSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: true });
    }

    showExerciseConfigurationScreen() {
        this.setState({ exerciseConfigurationScreenVisible: true });
    }

    hideSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: false });
    }

    hideExerciseConfigurationScreen() {
        this.setState({ exerciseConfigurationScreenVisible: false });
    }

    getTimeItems() {
        const mapFunc = (time, index) =>
          <Picker.Item key={index} label={time.label} value={time.id} />;
        return store.planningTimes.map(mapFunc);
    }

    getSubjectAreaItems() {
        const mapFunc = subject =>
          <Picker.Item key={subject.id} label={subject.name} value={subject.id} />;

        const empty = <Picker.Item key={0} label="-- Selecione --" value={0} />;
        return [empty].concat(store.teacher.subjectAreas.map(mapFunc));
    }

    getNextScreenFunction() {
        const exerciseTypeId = this.state.exerciseTypeId || store.exerciceTypes[0].id;
        if (exerciseTypeId === 1) {
            return this.showSetDateForClassScreen;
        }
        return this.showExerciseConfigurationScreen;
    }

    render() {
        const { navigate } = this.props.navigation;

        const subjectAreaItems = this.getSubjectAreaItems();
        const timeItems = this.getTimeItems();

        const exerciseTypeId = this.state.exerciseTypeId || store.exerciceTypes[0].id;
        const hasTempoAproximado = exerciseTypeId === 1;
        const showNextScreen = this.getNextScreenFunction();

        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
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
            <Content>
              <BubbleMenu mode="schoolYear" />
              <Content padder>
                <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                  <Label>Tipo do Exercício</Label>
                </Item>
                <View style={styles.buttonView}>
                  {store.exerciceTypes.map((type, index) =>
                    <Button
                      key={index}
                      rounded
                      onPress={() => this.setState({ exerciseTypeId: type.id })}
                      style={
                                        type.id === this.state.exerciseTypeId
                                            ? styles.buttonActive
                                            : styles.buttonInactive
                                    }
                    >
                      <Text>{type.name}</Text>
                    </Button>,
                            )}
                </View>
                <Field
                  name="disciplina"
                  label="Disciplina"
                  component={PickerField}
                  props={{ initialValue: 0 }}
                >
                  {subjectAreaItems}
                </Field>
                {hasTempoAproximado &&
                <Field
                  name="tempoAproximado"
                  label="Tempo Aproximado"
                  component={PickerField}
                  props={{ initialValue: 60 }}
                >
                  {timeItems}
                </Field>}
                <Field
                  style={{ height: 150 }}
                  name="information"
                  label="Descrição da Atividade"
                  component={TextField}
                  multiline
                />
              </Content>
            </Content>
            <SetDateForClassScreen
              visible={this.state.setDateForClassScreenVisible}
              hideModal={this.hideSetDateForClassScreen}
            />
            <ExerciseConfigurationScreen
              subjectAreaId={this.props.subjectAreaId}
              visible={this.state.exerciseConfigurationScreenVisible}
              hideModal={this.hideExerciseConfigurationScreen}
            />
          </Container>
        );
    }
}

const form = reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);
const selector = formValueSelector('formExerciseScreen');
export default connect(state => ({
    subjectAreaId: selector(state, 'disciplina'),
}))(form);
