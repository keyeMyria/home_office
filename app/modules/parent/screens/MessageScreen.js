// @flow
import React, { Component } from 'react';
import { Text } from 'native-base';

import ScreenShell from '../../../components/ScreenShell';
import BubbleMenu from '../../../components/BubbleMenu';

export default class MessageScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Mensagens" navigate={navigate} padder={false}>
            <BubbleMenu />
            <Text>Mensagens</Text>
          </ScreenShell>
        );
    }
}
