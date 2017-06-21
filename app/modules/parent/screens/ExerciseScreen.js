import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Dimensions } from 'react-native';
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
    Item,
    Label,
    Button,
    Picker,
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { observer } from 'mobx-react/native';

import store from '../../../store';
import { PickerField, TimePickerField } from '../../../components/fields';

import { styles } from '../../../themes/educareTheme';

import BubbleMenu from '../../../components/BubbleMenu';

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

const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

@observer
class ExerciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { subjectAreaIds: [], daysOfWeek: [] };
    }

    toogleSelectSubjectArea(id) {
        const subjectAreaIds = this.state.subjectAreaIds.slice();
        const index = subjectAreaIds.indexOf(id);
        if (index === -1) {
            subjectAreaIds.push(id);
        } else {
            subjectAreaIds.splice(index, 1);
        }

        this.setState({ subjectAreaIds });
    }

    toogleDaysOfWeek(id) {
        const daysOfWeek = this.state.daysOfWeek.slice();
        const index = daysOfWeek.indexOf(id);
        if (index === -1) {
            daysOfWeek.push(id);
        } else {
            daysOfWeek.splice(index, 1);
        }
        this.setState({ daysOfWeek });
    }

    subjectAreaIsSelected(id) {
        return this.state.subjectAreaIds.indexOf(id) !== -1;
    }

    dayOfWeekIsSelected(index) {
        return this.state.daysOfWeek.indexOf(index) !== -1;
        // return !!this.state.daysOfWeek;
    }

    rendersubjectAreas() {
        const mapFunc = (subject, index) => {
            const onPress = () => this.toogleSelectSubjectArea(subject.id);
            const active = this.subjectAreaIsSelected(subject.id);
            const styleActive = ACTIVE_STYLE_MAP[active];

            return (
              <Button key={index} rounded onPress={onPress} style={styleActive}>
                <Text style={{ fontSize: 12 }}>{subject.name}</Text>
              </Button>
            );
        };

        return (
          <View>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Disciplinas a Executar Simulados</Label>
            </Item>
            <View style={styles.buttonView}>
              {store.subjectAreas.map(mapFunc)}
            </View>
          </View>
        );
    }

    renderTimeFields() {
        const mapFunc = (day, index) => {
            const onPress = () => this.toogleDaysOfWeek(index);
            const active = this.dayOfWeekIsSelected(index);
            const styleActive = ACTIVE_STYLE_MAP[active];

            const fieldProps = {
                component: TimePickerField,
                props: {
                    initialValue: '00:00',
                },
            };
            const startProps = Object.assign({ name: `start_time_day_${index}` }, fieldProps);
            const endProps = Object.assign({ name: `end_time_day_${index}` }, fieldProps);

            return (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Button rounded onPress={onPress} style={styleActive}>
                  <Text style={{ fontSize: 12 }}>{day}</Text>
                </Button>
                {active &&
                <View style={localStyle.timePickerWrapper}>
                  <Field {...startProps} />
                  <Text style={{ marginHorizontal: 5 }}>às</Text>
                  <Field {...endProps} />
                </View>}
              </View>
            );
        };

        return DAYS_OF_WEEK.map(mapFunc);
    }

    renderLoadExerciceField() {
        const pickerItems = store.planningTimes.map((time, index) =>
          <Picker.Item key={index} label={time.label} value={time.id} />,
        );
        const props = {
            name: 'ExerciseLoad',
            label: 'Carga Para o Simulado',
            component: PickerField,
            props: {
                initialValue: 1,
            },
        };

        return <View><Field {...props}>{pickerItems}</Field></View>;
    }

    render() {
        const { navigate } = this.props.navigation;

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
              <Right />
            </Header>
            <Content>
              <BubbleMenu />
              <Content padder>
                {this.renderLoadExerciceField()}
                {this.rendersubjectAreas()}
                <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                  <Label>
                    {`Você tem ${this.state.subjectAreaIds
                                    .length} disciplina(s) selecionada(s)!`}
                  </Label>
                </Item>
                <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                  <Label>Horários para realização das listas</Label>
                </Item>
                <View>
                  {this.renderTimeFields()}
                </View>
              </Content>
            </Content>
          </Container>
        );
    }
}

const localStyle = {
    timePickerWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
};

export default reduxForm({ form: 'formExerciseScreen' })(ExerciseScreen);
