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
    Item,
    ListItem,
    CheckBox,
    Label,
} from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';
import ProvaStore from '../../../store/stores/ProvaStore';

import { PickerField } from '../../../components/fields';

import BubbleMenu from '../../../components/BubbleMenu';
import SetDateForClassScreen from './SetDateForClassScreen';

@observer
class ExamScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setDateForClassScreenVisible: false,
            openTopics: [],
        };
        this.showSetDateForClassScreen = this.showSetDateForClassScreen.bind(this);
        this.hideSetDateForClassScreen = this.hideSetDateForClassScreen.bind(this);
        this.checkUncheckTopic = this.checkUncheckTopic.bind(this);
        this.toogleTopic = this.toogleTopic.bind(this);
    }

    showSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: true });
    }

    hideSetDateForClassScreen() {
        this.setState({ setDateForClassScreenVisible: false });
    }

    checkUncheckTopic(checked, topicId) {
        if (checked) {
            store.uncheckExamTopic(topicId);
        } else {
            store.checkExamTopic(topicId);
        }
    }

    getGradesItems() {
        const mapFunc = (grade, index) =>
          <Picker.Item key={index} label={`${grade} Pontos`} value={grade} />;
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mapFunc);
    }

    getSubjectAreaItems() {
        const mapFunc = (subject, index) =>
          <Picker.Item key={index} label={subject.name} value={subject.id} />;
        return store.teacher.subjectAreas.map(mapFunc);
    }

    getPeriodItems() {
        const mapFunc = (period, index) =>
          <Picker.Item key={index} label={period.name} value={period.id} />;
        return store.periods.map(mapFunc);
    }

    getSubjectAreas() {
        const { disciplina } = this.props.formValues;
        return store.teacher.subjectAreas.filter(subject => subject.id === disciplina);
    }

    getTopics() {
        const subjectAreas = this.getSubjectAreas();
        if (subjectAreas.length) {
            return subjectAreas[0].topics;
        }
        return store.teacher.subjectAreas[0].topics;
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
            const checked = store.examTopics.indexOf(topic.id) !== -1;
            const checkBoxPress = () => this.checkUncheckTopic(checked, topic.id);
            const checkBoxProps = {
                checked,
                style: { marginRight: 20 },
                onPress: checkBoxPress,
            };

            return (
              <ListItem key={index} onPress={checkBoxPress} icon style={{ marginLeft: 60 }}>
                <Body><Text>{topic.name}</Text></Body>
                <Right><CheckBox {...checkBoxProps} /></Right>
              </ListItem>
            );
        };

        return topics.map(mapFunc);
    }

    renderTopicsSelection() {
        const topics = this.getTopics();
        const mapFunc = (topic, index) => {
            const checked = store.examTopics.indexOf(topic.id) !== -1;
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

            const iconName = isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right';
            const onPress = () => this.toogleTopic(topic.id);
            if (isOpen) {
                return (
                  <View key={index}>
                    <ListItem onPress={onPress} icon>
                      <Left><Icon name={iconName} /></Left>
                      <Body><Text>{topic.name}</Text></Body>
                      <Right><CheckBox {...checkBoxProps} /></Right>
                    </ListItem>
                    {this.renderSubTopics(topic)}
                  </View>
                );
            }
            return (
              <ListItem key={index} onPress={onPress} icon>
                <Left><Icon name={iconName} /></Left>
                <Body><Text>{topic.name}</Text></Body>
                <Right><CheckBox {...checkBoxProps} /></Right>
              </ListItem>
            );
        };

        return topics.map(mapFunc);
    }

    render() {
        const { navigate } = this.props.navigation;
        const subjectAreaItems = this.getSubjectAreaItems();
        const periodItems = this.getPeriodItems();
        const gradesItems = this.getGradesItems();

        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </TouchableWithoutFeedback>
              </Left>
              <Body>
                <Title>Provas</Title>
              </Body>
              <Right>
                <TouchableWithoutFeedback onPress={this.showSetDateForClassScreen}>
                  <Text>{'> Datas'}</Text>
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
                <Item stackedLabel style={{ borderBottomWidth: 0 }}>
                  <Label>Selecione os Tópicos</Label>
                </Item>
              </Content>
              {this.renderTopicsSelection()}
            </Content>
            <SetDateForClassScreen
              visible={this.state.setDateForClassScreenVisible}
              hideModal={this.hideSetDateForClassScreen}
              screenFormValues={{
                ...this.props.formValues,
                topicos: store.examTopics.toJS(),
              }}
              screenStore={ProvaStore}
            />
          </Container>
        );
    }
}

const form = reduxForm({ form: 'formExamScreen' })(ExamScreen);
const selector = formValueSelector('formExamScreen');
export default connect(state => ({
    formValues: {
        disciplina: selector(state, 'disciplina'),
        bimestre: selector(state, 'bimestre'),
        valor: selector(state, 'valor'),
    },
}))(form);
