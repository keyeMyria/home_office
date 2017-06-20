import React, { Component } from 'react';
import { TouchableWithoutFeedback, Modal, View, Dimensions } from 'react-native';
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
import { Field, reduxForm } from 'redux-form';
import _ from 'underscore';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import { PickerField } from '../../../components/fields';
import SetDateForClassScreen from './SetDateForClassScreen';
import SelectQuestionScreen from './SelectQuestionScreen';

const QUESTION_QTDE_PICKER = _.range(0, 51, 1).map((val, index) => {
    const label = val === 0 ? 'Nenhuma' : val + (val === 1 ? ' Questão' : ' Questões');
    return <Picker.Item key={index} label={label} value={val + 1} />;
});

const ACTIVE_STYLE_MAP = {
    true: {
        ...styles.buttonActive,
        width: Dimensions.get('window').width / 3 - 15,
    },
    false: {
        ...styles.buttonInactive,
        width: Dimensions.get('window').width / 3 - 15,
    },
};

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

    showSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: true });
    }

    showSelectQuestionScreen() {
        this.setState({ selectQuestionScreenVisible: true });
    }

    hideSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: false });
    }

    hideSelectQuestionScreen() {
        this.setState({ selectQuestionScreenVisible: false });
    }

    /**
     * Render the field to choose the Question DataBase, used to generate the
     * Exercise
     */
    renderQuestionDatabaseTypes() {
        const { questionDatabaseTypeId } = this.state;

        const mapFunc = (type, index) => {
            const activeStyle = ACTIVE_STYLE_MAP[type.id === questionDatabaseTypeId];
            const onPress = () => this.setState({ questionDatabaseTypeId: type.id });
            return (
              <Button key={index} rounded onPress={onPress} style={activeStyle}>
                <Text style={{ textAlign: 'center', fontSize: 12 }}>{type.name}</Text>
              </Button>
            );
        };

        return store.questionDatabaseTypes.map(mapFunc);
    }

    /**
     * Render the field to choose the generation mode
     */
    renderQuestionGenerationTypes() {
        const { questionGenerationTypeId } = this.state;
        const mapFunc = (type, index) => {
            const onPress = () => this.setState({ questionGenerationTypeId: type.id });
            const activeStyle = ACTIVE_STYLE_MAP[type.id === questionGenerationTypeId];

            return (
              <Button key={index} rounded onPress={onPress} style={activeStyle}>
                <Text style={{ textAlign: 'center', fontSize: 12 }}>{type.name}</Text>
              </Button>
            );
        };

        return store.questionGenerationTypes.map(mapFunc);
    }

    /**
     * Renderiza o campo para escolher as dificuldades das questões
     */
    renderQuestionDificultPicker() {
        const { questionGenerationTypeId } = this.state;
        if (questionGenerationTypeId === 3) {
            return false;
        }
        const props = { initialValue: 1 };

        return (
          <View>
            <Field
              name="numQuestoesFaceis"
              label="Fáceis"
              component={PickerField}
              props={props}
            >
              {QUESTION_QTDE_PICKER}
            </Field>
            <Field
              name="numQuestoesMedias"
              label="Médios"
              component={PickerField}
              props={props}
            >
              {QUESTION_QTDE_PICKER}
            </Field>
            <Field
              name="numQuestoesDificeis"
              label="Difíceis"
              component={PickerField}
              props={props}
            >
              {QUESTION_QTDE_PICKER}
            </Field>
          </View>
        );
    }

    render() {
        const { questionGenerationTypeId, visible } = this.state;
        const showNextScreen = () => {
            if (questionGenerationTypeId === 3) {
                this.showSelectQuestionScreen();
            } else {
                this.showSetDateForClassScreen();
            }
        };

        return (
          <Modal animationType={'slide'} transparent={false} visible={visible}>
            <Container>
              <Header appHeader>
                <Left>
                  <TouchableWithoutFeedback onPress={this.props.hideModal}>
                    <Icon name="arrow-back" />
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
                  {this.renderQuestionDatabaseTypes()}
                </View>
                <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                  <Label>Modo de Geração</Label>
                </Item>
                <View style={styles.buttonView}>
                  {this.renderQuestionGenerationTypes()}
                </View>
                {this.renderQuestionDificultPicker()}
              </Content>
            </Container>
            <SetDateForClassScreen
              visible={this.state.setDateForClassScreenVisible}
              hideModal={() => this.hideSetDateForClassScreen()}
            />
            <SelectQuestionScreen
              visible={this.state.selectQuestionScreenVisible}
              hideModal={() => this.hideSelectQuestionScreen()}
            />
          </Modal>
        );
    }
}

export default reduxForm({ form: 'formExerciseConfigurationScreen' })(ExerciseConfigurationScreen);
