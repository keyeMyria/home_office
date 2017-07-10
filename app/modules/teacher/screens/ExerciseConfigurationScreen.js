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
    ListItem,
    CheckBox,
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import _ from 'underscore';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import { PickerField } from '../../../components/fields';
import SegmentedControl from '../../../components/SegmentedControl';
import SetDateForClassScreen from './SetDateForClassScreen';
import SelectQuestionScreen from './SelectQuestionScreen';

const QUESTION_QTDE_PICKER = _.range(0, 51, 1).map((val, index) => {
    const label = val === 0 ? 'Nenhuma' : val + (val === 1 ? ' Questão' : ' Questões');
    return <Picker.Item key={index} label={label} value={val + 1} />;
});

const ACTIVE_STYLE_MAP = {
    true: {
        ...styles.buttonActive,
        // width: (Dimensions.get('window').width / 3) - 15,
        width: 320 / 3 - 10,
        minWidth: 110,
    },
    false: {
        ...styles.buttonInactive,
        // width: (Dimensions.get('window').width / 3) - 15,
        width: 320 / 3 - 10,
        minWidth: 110,
    },
};

@observer
class ExerciseConfigurationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            openTopics: [],
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
        const items = store.questionDatabaseTypes.map(t => ({ key: t.id, value: t.name }));
        const onChange = id => this.setState({ questionDatabaseTypeId: id });
        return (
          <SegmentedControl items={items} onChange={onChange} selected={questionDatabaseTypeId} />
        );
    }

    /**
     * Render the field to choose the generation mode
     */
    renderQuestionGenerationTypes() {
        const { questionGenerationTypeId } = this.state;
        const items = store.questionGenerationTypes.map(t => ({ key: t.id, value: t.name }));
        const onChange = id => this.setState({ questionGenerationTypeId: id });
        return (
          <SegmentedControl items={items} onChange={onChange} selected={questionGenerationTypeId} />
        );
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

    getSubjectAreas() {
        const { subjectAreaId } = this.props;
        return store.teacher.subjectAreas.filter(subject => subject.id === subjectAreaId);
    }

    getTopics() {
        const subjectAreas = this.getSubjectAreas();
        if (subjectAreas.length) {
            return subjectAreas[0].topics;
        }
        // return store.teacher.subjectAreas[0].topics;
        return [];
    }

    checkUncheckTopic(checked, topicId) {
        if (checked) {
            store.uncheckExerciseTopic(topicId);
        } else {
            store.checkExerciseTopic(topicId);
        }
    }

    toogleTopic(id) {
        const openTopics = this.state.openTopics.slice();
        const index = openTopics.indexOf(id);
        if (index === -1) {
            openTopics.push(id);
        } else {
            openTopics.splice(index, 1);
        }
        this.setState({ openTopics });
    }

    renderSubTopics(mainTopic) {
        const topics = mainTopic.subtopics;

        const mapFunc = (topic, index) => {
            const checked = store.exerciseTopics.indexOf(topic.id) !== -1;
            const checkBoxPress = () => this.checkUncheckTopic(checked, topic.id);
            const checkBoxProps = {
                checked,
                style: { marginRight: 20 },
                onPress: checkBoxPress,
            };

            return (
              <ListItem key={index} onPress={checkBoxPress} icon style={{ marginLeft: 60 }}>
                <Body>
                  <Text>
                    {topic.name}
                  </Text>
                </Body>
                <Right>
                  <CheckBox {...checkBoxProps} />
                </Right>
              </ListItem>
            );
        };

        return topics.map(mapFunc);
    }

    isTopicSelected(topic) {
        const allSubtopicSelected = topic.subtopics
            .map(o => o.id)
            .every(id => store.exerciseTopics.indexOf(id) !== -1);
        return allSubtopicSelected;
    }

    isTopicSemiSelected(topic) {
        const someSubtopicSelected = topic.subtopics
            .map(o => o.id)
            .some(id => store.exerciseTopics.indexOf(id) !== -1);
        return !this.isTopicSelected(topic) && someSubtopicSelected;
    }

    renderTopicsSelection() {
        const topics = this.getTopics();
        const mapFunc = (topic, index) => {
            const checked = this.isTopicSelected(topic) || this.isTopicSemiSelected(topic);
            const checkBoxPress = () => {
                topic.subtopics.forEach(sub => this.checkUncheckTopic(checked, sub.id));
                this.checkUncheckTopic(checked, topic.id);
            };
            const isOpen = this.state.openTopics.indexOf(topic.id) !== -1;
            const checkBoxProps = {
                checked,
                style: { marginRight: 20 },
                onPress: checkBoxPress,
            };
            if (this.isTopicSemiSelected(topic)) {
                checkBoxProps.color = 'darkgray';
            }

            const iconName = isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right';
            const onPress = () => this.toogleTopic(topic.id);
            if (isOpen) {
                return (
                  <View key={index}>
                    <ListItem onPress={onPress} icon>
                      <Left>
                        <Icon name={iconName} />
                      </Left>
                      <Body>
                        <Text>
                          {topic.name}
                        </Text>
                      </Body>
                      <Right>
                        <CheckBox {...checkBoxProps} />
                      </Right>
                    </ListItem>
                    {this.renderSubTopics(topic)}
                  </View>
                );
            }
            return (
              <ListItem key={index} onPress={onPress} icon>
                <Left>
                  <Icon name={iconName} />
                </Left>
                <Body>
                  <Text>
                    {topic.name}
                  </Text>
                </Body>
                <Right>
                  <CheckBox {...checkBoxProps} />
                </Right>
              </ListItem>
            );
        };

        return topics.map(mapFunc);
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
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={visible}
            onRequestClose={() => {}}
          >
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
                <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                  <Label>Selecione os tópicos</Label>
                </Item>
                {this.renderTopicsSelection()}
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
