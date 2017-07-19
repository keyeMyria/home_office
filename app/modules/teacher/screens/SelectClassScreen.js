import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Alert } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Icon,
    Body,
    Text,
    Picker,
} from 'native-base';
import _ from 'underscore';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import { PickerField, DatePickerField } from '../../../components/fields';
import store, { studentStore } from '../../../store';
import OccurrenceReasonScreen from './OccurrenceReasonScreen';
import StudentPicker from './../../../components/StudentPicker';
import httpClient from '../../../lib/HttpClient';

@observer
class SelectClassScreen extends Component {

    @observable selected = [];

    constructor(props) {
        super(props);
        this.state = {
            absenseScreenVisible: false,
            occurrenceScreenVisible: false,
            anos: [],
            turmas: [],
        };

        this.showAbsenseScreen = this.showAbsenseScreen.bind(this);
        this.showOccurrenceScreen = this.showOccurrenceScreen.bind(this);
        this.hideAbsenseScreen = this.hideAbsenseScreen.bind(this);
        this.hideOccurrenceScreen = this.hideOccurrenceScreen.bind(this);
    }

    componentWillMount() {
        httpClient.get('anos')
            .then((res) => {
                // console.log('here is the result ********** ', res.data._embedded.anos)
                this.setState({
                    anos: res.data._embedded.anos,
                });
            });
        httpClient.get('turmas')
            .then((res) => {
                this.setState({
                    turmas: res.data._embedded.turmas,
                });
            });
    }

    showAbsenseScreen() {
        this.setState({ absenseScreenVisible: true });
    }
    showOccurrenceScreen() {
        this.setState({ occurrenceScreenVisible: true });
    }
    hideAbsenseScreen() {
        this.setState({ absenseScreenVisible: false });
    }
    hideOccurrenceScreen() {
        this.setState({ occurrenceScreenVisible: false });
    }

    checkUncheckStudent(checked, studentId) {
        const map = {
            AbsenseScreen: {
                true: store.uncheckStudentAbsense.bind(store),
                false: store.checkStudentAbsense.bind(store),
            },
            OccurrenceScreen: {
                true: store.uncheckStudentOccurrence.bind(store),
                false: store.checkStudentOccurrence.bind(store),
            },
        };

        const { state: { params } } = this.props.navigation;
        const nextScreen = params.nextScreen;

        return map[nextScreen][checked] && map[nextScreen][checked](studentId);
    }

    getTitle(nextScreen) {
        const map = { AbsenseScreen: 'Faltas', OccurrenceScreen: 'Ocorrências' };
        return map[nextScreen] || 'Faltas';
    }

    navigate(nextScreen) {
        const map = {
            AbsenseScreen: this.showAbsenseScreen,
            OccurrenceScreen: this.showOccurrenceScreen,
        };
        return map[nextScreen] && map[nextScreen]();
    }

    getStore() {
        // const map = { AbsenseScreen: 'absenses', OccurrenceScreen: 'occurrences' };
        // const { state: { params } } = this.props.navigation;
        // return store[map[params.nextScreen]];
        return this.selected;
    }

    save() {
        const { navigate } = this.props.navigation;
        Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
            { text: 'OK', onPress: () => navigate('HomeRouter') },
        ]);
    }

    canSave() {
        const { classe, date, turma } = this.props;
        const hasStudantSelected = !!this.getStore().length;
        return !!(classe && date && turma && hasStudantSelected);
    }

    getNextText(nextScreen) {
        const map = { AbsenseScreen: 'Salvar', OccurrenceScreen: 'Próximo' };
        return map[nextScreen] || 'Salvar';
    }

    getNextFunction(nextScreen) {
        const map = {
            AbsenseScreen: this.save.bind(this),
            OccurrenceScreen: this.showOccurrenceScreen.bind(this),
        };
        return map[nextScreen] || 'Salvar';
    }

    renderStudentList() {
        studentStore.fetchStudents();
        return (
          <StudentPicker students={studentStore.students} selected={this.selected} />
        );
    }

    getClassesItems() {
        const classNames = _.uniq(
            this.state.anos.map(o => o.titulo),
        ).map((name, index) => ({ id: index + 1, name }));

        const mapFunc = ({ id, name }) => <Picker.Item key={id} value={id} label={name} />;
        const empty = <Picker.Item key={0} value={0} label="-- Selecione --" />;
        return [empty].concat(classNames.map(mapFunc));
    }

    getTurmasItems() {
        const classNames = _.uniq(
            this.state.turmas.map(o => o.titulo),
        ).map((name, index) => ({ id: index + 1, name }));

        const mapFunc = ({ id, name }) => <Picker.Item key={id} value={id} label={name} />;
        const empty = <Picker.Item key={0} value={0} label="-- Selecione --" />;
        return [empty].concat(classNames.map(mapFunc));
    }

    renderFilters() {
        return (
          <View>
            <Field
              name="date"
              label="Data"
              component={DatePickerField}
              props={{ initialValue: '-' }}
            />
            <Field
              name="classe"
              label="Ano"
              component={PickerField}
              props={{ initialValue: '-' }}
            >
              {this.getClassesItems()}
            </Field>
            <Field
              name="turma"
              label="Turma"
              component={PickerField}
              props={{ initialValue: '-' }}
            >
              {this.getTurmasItems()}
            </Field>
          </View>
        );
    }

    render() {
        const { navigate, state: { params } } = this.props.navigation;
        const { classe, date, turma } = this.props;
        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </TouchableWithoutFeedback>
              </Left>
              <Body>
                <Title>{this.getTitle(params.nextScreen)}</Title>
              </Body>
              <Right>
                {this.canSave() &&
                <TouchableWithoutFeedback onPress={this.getNextFunction(params.nextScreen)}>
                  <Text>{this.getNextText(params.nextScreen)}</Text>
                </TouchableWithoutFeedback>}
              </Right>
            </Header>
            <Content>
              {this.renderFilters()}
              {classe && date && turma && this.renderStudentList()}
            </Content>
            <OccurrenceReasonScreen
              navigate={navigate}
              visible={this.state.occurrenceScreenVisible}
              hideModal={this.hideOccurrenceScreen}
            />
          </Container>
        );
    }
}

const form = reduxForm({ form: 'formSelectClassScreen' })(SelectClassScreen);
const selector = formValueSelector('formSelectClassScreen');
export default connect(state => ({
    turma: selector(state, 'turma'),
    date: selector(state, 'date'),
    classe: selector(state, 'classe'),
}))(form);
