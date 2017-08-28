import React, { Component } from 'react';
import { Platform, Dimensions } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import _ from 'lodash';

export default class BackButton extends Component {
    props: {
        onPress: () => void,
        visible: boolean,
    };

    shouldComponentUpdate(newProps: any) {
        if (newProps === this.props) return false;
        return !_.isEqual(newProps, this.props);
    }

    render() {
        const { onPress, visible } = this.props;
        const small = Dimensions.get('window').width < 360;
        if (!visible && Platform.OS === 'ios') return null;

        return (
          <Button
            onPress={onPress}
            small={small}
            bordered
            light
            style={{ ...styles.button, display: visible ? 'flex' : 'none' }}
          >
            <Icon name="chevron-left" style={styles.icon} />
            <Text style={styles.text}>Voltar</Text>
          </Button>
        );
    }
}

const styles = {
    button: {
        position: 'absolute',
        zIndex: 20,
        top: Platform.OS === 'ios' ? 30 : 15,
        left: 15,
    },
    icon: {
        color: '#fff',
    },
    text: {
        color: '#fff',
    },
};
