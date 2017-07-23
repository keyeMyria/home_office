// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';

import { Text } from 'react-native';

// Store
import eventoStore from '../../../stores/EventosStore';

import ScreenShell from '../../../components/ScreenShell';

@observer
export default class LancarNotasScreen extends Component {
    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Lançar Notas',
            loading: eventoStore.loading,
            rightText: 'Cancelar',
            rightPress: () => navigate('CalendarScreen'),
            showRight: true,
            padder: false,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <Text>{eventoStore.selectedEventLancar.tarefa.titulo}</Text>
          </ScreenShell>
        );
    }
}
