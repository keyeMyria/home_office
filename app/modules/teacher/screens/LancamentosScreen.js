// @flow
import React, { Component } from 'react';
import { Text } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import ScreenShell from '../../../components/ScreenShell';

@observer
export default class MessageScreen extends Component {
    @observable
    store = {
        visible: false,
        title: '',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Mensagens" navigate={navigate} padder={false}>
            <Text>Lancamentos</Text>
          </ScreenShell>
        );
    }
}
