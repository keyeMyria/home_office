// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';

// Store
import avisoStore from './../../stores/AvisoStore';

import ScreenShell from './../../components/ScreenShell';
import CardAlert from './../../components/CardAlert';
import BubbleMenu from './../../components/BubbleMenu';

@observer
export default class AlertScreen extends Component {
    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Avisos',
            loading: avisoStore.loading,
            padder: false,
        };
    }

    render() {
        const alerts = avisoStore.avisos || [];
        return (
          <ScreenShell {...this.screenShellProps}>
            <BubbleMenu />
            {alerts.map(aviso => <CardAlert key={aviso.id} alert={aviso} />)}
          </ScreenShell>
        );
    }
}
