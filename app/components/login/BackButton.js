import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

export default class BackButton extends Component {
    props: {
        onPress: () => void,
        visible: boolean,
    };

    render() {
        const { onPress, visible } = this.props;
        if (!visible) return null;

        return (
          <Button onPress={onPress} iconLeft bordered light style={styles.button}>
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
        top: 15,
        left: 15,
    },
    icon: {
        color: '#fff',
    },
    text: {
        color: '#fff',
    },
};
