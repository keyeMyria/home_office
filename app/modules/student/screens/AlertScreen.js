/* @flow */
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import store from '../../../store';
import ScreenShell from '../../../components/ScreenShell';
import CardAlert from '../../../components/CardAlert';

@observer
export default class AlertScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        const alerts = store.studentSelected.alerts.items;

        return (
          <ScreenShell navigate={navigate} title="Alertas">
            {alerts.map((alert, index) => <CardAlert key={index} alert={alert} />)}
          </ScreenShell>
        );
    }
}
