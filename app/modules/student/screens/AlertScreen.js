/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';

// Store
import avisoStore from '../../../stores/AvisoStore';

import ScreenShell from '../../../components/ScreenShell';
import CardAlert from '../../../components/CardAlert';

@observer
export default class AlertScreen extends Component {
    get screenShellProps() {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Alertas',
            loading: avisoStore.loading,
        };
    }

    render() {
        const alerts = avisoStore.avisos;
        return (
          <ScreenShell>
            {alerts.map(aviso => <CardAlert key={aviso.id} alert={aviso} />)}
          </ScreenShell>
        );
    }
}
