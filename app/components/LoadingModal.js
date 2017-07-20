import React, { Component } from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';
import { observer } from 'mobx-react/native';

@observer
export default class LoadingModal extends Component {
  props: {
    loading: boolean,
    children: any,
  };

  render() {
    if (this.props.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
          <Text>Carregando</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
