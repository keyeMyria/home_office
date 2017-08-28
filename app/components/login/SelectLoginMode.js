// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { observer } from 'mobx-react/native';

@observer
export default class SelectLoginMode extends Component {
    props: {
        onPress: (mode: string) => void,
    };

    facebookPress = () => {
        this.props.onPress('FACEBOOK');
    };

    loginPress = () => {
        this.props.onPress('PASSWORD');
    };

    newUserPress = () => {
        this.props.onPress('NEW_USER');
    };

    render() {
        return (
          <View>
            <Button block style={styles.button} light onPress={this.newUserPress}>
              <Text style={styles.buttonText}>Criar novo Usuário</Text>
            </Button>
            <Button block style={styles.facebook} onPress={this.facebookPress}>
              <Text style={{ color: '#fff' }}>Continuar com Facebook</Text>
            </Button>
            <Text style={styles.haveAccount}>Já possui usuário e senha?</Text>
            <Button block style={styles.button} light onPress={this.loginPress}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
          </View>
        );
    }
}

const styles = {
    facebook: {
        marginBottom: 15,
        backgroundColor: '#3b5998',
    },
    button: {
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
    },
    haveAccount: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0)',
        alignSelf: 'center',
        marginBottom: 10,
    },
};
