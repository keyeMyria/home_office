// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import { PickerField, DatePickerField } from '../../../components/mobx_fields';
import ScreenShell from './../../../components/ScreenShell';
import StudentPicker from './../../../components/StudentPicker';

import store from '../../../store';
import professorStore from '../../../stores/ProfessorStore';

@observer
export default class ComunicadosScreen extends Component {
    @observable
    form = {
        studentsSelected: observable([]),
        ano: null,
        data: null,
        turma: null,
    };

    @observable
    store = {
        alunos: [],
        anos: [],
        turmas: [],
    };

    renderFilters() {
        return (
          <View>
            <DatePickerField
              value={this.form.data}
              onChange={date => (this.form.data = date)}
            />
            <PickerField
              label="Ano"
              items={professorStore.anos}
              itemLabel="titulo"
              value={this.form.ano}
              onChange={id => (this.form.ano = id)}
            />
            <PickerField
              label="Turma"
              items={[]}
              value={this.form.turma}
              onChange={id => (this.form.turma = id)}
            />
          </View>
        );
    }

    get showNext(): boolean {
        return true;
    }

    onNext() {
        console.warn('click');
    }

    get screenProps(): Object {
        return {
            navigate: this.props.navigation.navigate,
            title: 'Comunicados',
            showRight: this.showNext,
            rightText: 'Próximo',
            rightPress: this.onNext,
        };
    }

    renderStudents() {
        return (
          <StudentPicker
            students={store.students}
            selected={this.form.studentsSelected}
            selectAll
          />
        );
    }

    render() {
        return (
          <ScreenShell {...this.screenProps}>
            {this.renderFilters()}
            {this.renderStudents()}
          </ScreenShell>
        );
    }
}
