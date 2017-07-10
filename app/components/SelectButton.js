import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Button, Text } from 'native-base';

export default class SelectButton extends Component {
    props: {
        active: boolean,
        onPress: () => void,
        text: string,
        style: ?Object,
    };

    static defaultProps = {
        style: {},
    };


    /**
     * Hack to circuvent the fact that native base do not support styles arrays
     */
    get style() {
        const { active, style } = this.props;
        const aditional = active ? styles.buttonActive : styles.buttonInactive;

        return {
            ...styles.buttonStyle,
            ...aditional,
            ...style,
        };
    }

    render() {
        const { onPress, text } = this.props;

        return (
          <Button rounded onPress={onPress} style={this.style}>
            <Text style={styles.textStyle}>
              {text}
            </Text>
          </Button>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 12,
    },
    buttonStyle: {
        backgroundColor: '#b5b5b5',
        width: (Dimensions.get('window').width / 3) - 15,
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonActive: {
        backgroundColor: '#26C6DA',
    },
    buttonInactive: {},
};
