// @flow
import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';

export default class LoadingIndicator extends Component {
    props: {
        visible: boolean,
    };

    static defaultProps: {
        visible: true,
    };

    render() {
        if (!this.props.visible) return null;
        return (
          <View style={styles.view}>
            <ActivityIndicator size="large" />
            <Text>Carregando</Text>
          </View>
        );
    }
}

const styles = {
    view: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        padding: 15,
    },
};
