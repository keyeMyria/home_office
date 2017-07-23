// @flow
import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { observer } from 'mobx-react/native';

@observer
export default class LoadingModal extends Component {
    props: {
        loading?: boolean,
        // children: any,
    };

    static defaultProps = {
        color: 'gray',
        loading: false,
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
