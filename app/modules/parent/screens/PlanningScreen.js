import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
    Content,
    Picker,
    Item,
    Label,
} from 'native-base';
import { Field, reduxForm } from 'redux-form';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import BubbleMenu from '../../../components/BubbleMenu';
import ScreenShell from '../../../components/ScreenShell';

import { PickerField } from '../../../components/fields';

@observer
class PlanningScreen extends Component {
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
    };

    save = (values) => {
        store.saveStudentPlanning(values);
        Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    };

    render() {
        const { navigate } = this.props.navigation;
        const subjectAreas = store.studentSelected.subjectAreas.items;

        const pickerItems = store.planningTimes.map((time, index) =>
          <Picker.Item key={index} label={time.label} value={time.id} />,
        );

        const shellOptions = {
            title: 'Rotina',
            rightText: 'Salvar',
            rightPress: this.props.handleSubmit(this.save),
            showRight: true,
            padder: false,
        };

        return (
          <ScreenShell navigate={navigate} {...shellOptions}>
            <BubbleMenu />
            <Content padder>
              <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
                <Label>
                            A rotina de exercícios permite que você determine um mínimo que deseja
                            que seu filho faça de exercícios por semana. Dessa maneira, se o
                            professor de determinada disciplina não der exercícios para casa, o
                            EducareBox irá automaticamente gerar uma lista para o seu filho, baseada
                            nos últimos tópicos dados em sala.
                        </Label>
                <Label>Carga mínima:</Label>
              </Item>
              {subjectAreas.map((subjectArea, index) => {
                  const currentValue = store.studentSelected.planning[subjectArea.key] || 0;
                  return (
                    <Field
                      key={index}
                      name={subjectArea.key}
                      label={subjectArea.name}
                      component={PickerField}
                      props={{ initialValue: currentValue }}
                    >
                      {pickerItems}
                    </Field>
                  );
              })}
            </Content>
          </ScreenShell>
        );
    }
}

export default reduxForm({ form: 'formPlanningScreen' })(PlanningScreen);
