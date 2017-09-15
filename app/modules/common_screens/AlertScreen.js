// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
// Store
import avisoStore from './../../stores/AvisoStore';

import ScreenShell from './../../components/ScreenShell';
import EmptyScreen from './../../components/EmptyScreen';
import CardAlert from './../../components/CardAlert';
import BubbleMenu from './../../components/BubbleMenu';

const emptyEventsImg = require('../../img/calendar_empty.png');

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
          <ScreenShell {...this.screenShellProps} emptyScreen={!alerts.length}>
            <BubbleMenu />
            {alerts.length ? (
                    alerts.map(aviso => <CardAlert key={aviso.id} alert={aviso} />)
                ) : (
                  <EmptyScreen
                    title="Ops! Nenhum Aviso"
                    text="Nenhum aviso cadastrado pelo colégio"
                    image={emptyEventsImg}
                  />
                )}
          </ScreenShell>
        );
    }
}
