// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { LayoutAnimation, Platform } from 'react-native';

import professorStore from './../../../stores/ProfessorStore';
import faltaStore from './../../../stores/professor/FaltasStore';
import ScreenShell from './../../../components/ScreenShell';
import StudentPicker from './../../../components/StudentPicker';
import StudentItem from './../../../components/StudentPikerFaltas';
import { DatePickerField, ForeignKeyField } from './../../../components/mobx_fields';

@observer
export default class FaltasScreen extends Component {
    componentWillUnmount() {
        faltaStore.reset();
    }

    componentWillReact() {
        if (Platform.os === 'ios') {
            LayoutAnimation.easeInEaseOut();
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Faltas" navigate={navigate}>
            <DatePickerField label="Data" store={faltaStore} storeKey="data" />
            <ForeignKeyField
              label="Ano"
              items={professorStore.anosMap}
              store={faltaStore}
              storeKey="ano"
            />
            {faltaStore.showTurma && (
            <ForeignKeyField
              label="Turma"
              items={faltaStore.turmasMap}
              store={faltaStore}
              storeKey="turma"
            />
                )}
            {faltaStore.showAula && (
            <ForeignKeyField
              label="Aula"
              items={faltaStore.aulasMap}
              store={faltaStore}
              storeKey="aula"
              emptyLabel="Todas"
            />
                )}
            <StudentPicker
              StudentItemComponent={StudentItem}
              alunos={faltaStore.alunosMap.values()}
            />
          </ScreenShell>
        );
    }
}
