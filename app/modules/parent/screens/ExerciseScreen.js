import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Content, Text, Item, Label, Picker } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react/native';

// Store
import store from '../../../store';

// Components
import BubbleMenu from '../../../components/BubbleMenu';
import MultipleSelectButton from '../../../components/MultipleSelectButton';
import SelectButton from '../../../components/SelectButton';
import ScreenShell from '../../../components/ScreenShell';
import { PickerField, TimePickerField } from '../../../components/fields';

const DAYS_OF_WEEK = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

@observer
class ExerciseScreen extends Component {
    @observable subjectAreaIds = [];
    @observable daysOfWeek = [];

    @computed
    get diciplinasItems() {
        return store.subjectAreas.map(d => ({
            key: d.id,
            value: d.name,
            active: this.subjectAreaIds.indexOf(d.id) !== -1,
        }));
    }

    toogleDisciplina(id, active) {
        const index = this.subjectAreaIds.indexOf(id);
        if (index === -1 && active) {
            this.subjectAreaIds.push(id);
        } else {
            this.subjectAreaIds.splice(index, 1);
        }
    }

    toogleDaysOfWeek(id) {
        const index = this.daysOfWeek.indexOf(id);
        if (index === -1) {
            this.daysOfWeek.push(id);
        } else {
            this.daysOfWeek.splice(index, 1);
        }
    }

    rendersubjectAreas() {
        return (
          <View>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Disciplinas a Executar Simulados</Label>
            </Item>
            <MultipleSelectButton
              items={this.diciplinasItems}
              onChange={this.toogleDisciplina}
            />
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>
                {`Você tem ${this.subjectAreaIds.lenght} disciplina(s) selecionada(s)!`}
              </Label>
            </Item>
          </View>
        );
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

        return (
          <View>
            <Field {...props}>
              {pickerItems}
            </Field>
          </View>
        );
    }

    renderTimeFields(day, index) {
        const onPress = () => this.toogleDaysOfWeek(index);
        const active = this.daysOfWeek.indexOf(index) !== -1;

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
            <SelectButton text={day} onPress={onPress} active={active} />
            {active &&
            <View style={localStyle.timePickerWrapper}>
              <Field {...startProps} />
              <Text style={{ marginHorizontal: 5 }}>às</Text>
              <Field {...endProps} />
            </View>}
          </View>
        );
    }


    render() {
        const { navigate } = this.props.navigation;

        const shellOptions = {
            title: 'Simulados',
            rightText: 'Salvar',
            rightPress: () => {
                Alert.alert('Sucesso', 'Dados salvos com sucesso!', [{ text: 'OK' }]);
            },
            showRight: true,
            padder: false,
        };

        return (
          <ScreenShell navigate={navigate} {...shellOptions}>
            <BubbleMenu />
            <Content padder>
              {this.renderLoadExerciceField()}
              {this.rendersubjectAreas()}
              <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                <Label>Horários para realização das listas</Label>
              </Item>
              <View>
                {DAYS_OF_WEEK.map(this.renderTimeFields, this)}
              </View>
            </Content>
          </ScreenShell>
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
