// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { View, Image } from 'react-native';
import { Text } from 'native-base';

// Store
import avisoStore from './../../stores/AvisoStore';

import ScreenShell from './../../components/ScreenShell';
import CardAlert from './../../components/CardAlert';
import BubbleMenu from './../../components/BubbleMenu';

const emptyEventsImg = require('../../img/blankCalendar.png');

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
            {
                alerts.length ?

                alerts.map(aviso => <CardAlert key={aviso.id} alert={aviso} />)

                :

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                }}
                >
                  <Image
                    source={emptyEventsImg}
                    style={{
                        width: 50,
                        height: 50,
                        margin: 15,
                    }}
                  />
                  <Text>
                      Nenhuma aviso cadastrado.
                    </Text>
                </View>

                }
          </ScreenShell>
        );
    }
}
