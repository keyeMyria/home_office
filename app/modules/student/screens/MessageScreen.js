// @flow
import React, { Component } from 'react';
import { Text } from 'native-base';

import ScreenShell from '../../../components/ScreenShell';

export default class MessageScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Mensagens" navigate={navigate}>
            <Text>Mensagens</Text>
          </ScreenShell>
        );
    }
}
