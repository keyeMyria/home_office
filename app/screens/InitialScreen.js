// @flow
import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { Button, Text, Thumbnail } from 'native-base';

import { when } from 'mobx';
import { observer } from 'mobx-react/native';

import facebookLogin from './../lib/facebookLogin';
import userStore from './../stores/UserStore';

@observer
export default class LoginScreen extends Component {
    when: () => void;

    constructor(props: any) {
        super(props);
        const onAuth = () => {
            if (userStore.role) {
                this.props.navigation.navigate(userStore.homeScreen);
            }
        };
        this.when = when(() => userStore.hasAuth, onAuth);
    }

    componentWillUnmount() {
        this.when();
    }

    facebookPress = () => {
        facebookLogin.login().then((token) => {
            if (token) {
                this.props.navigation.navigate('CreateUserScreen', { token });
            } else {
                Alert.alert('Erro', 'Não foi possível logar usando o facebook');
            }
        });
    };

    loginPress = () => {
        this.props.navigation.navigate('LoginScreen');
    };

    newUserPress = () => {
        this.props.navigation.navigate('CreateUserScreen');
    };

    render() {
        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <View style={styles.loginView}>
              <Thumbnail source={ICON_IMG} style={styles.loginImage} />
              <View style={{ flex: 1 }} />
              <Button block style={styles.button} success onPress={this.newUserPress}>
                <Text style={styles.buttonText}>Criar novo Usuário</Text>
              </Button>
              <Button block style={styles.facebook} onPress={this.facebookPress}>
                <Text>Continuar com Facebook</Text>
              </Button>
              <View style={{ flex: 1 }} />
              <Text style={styles.haveAccount}>Já tem usuário e senha?</Text>
              <Button block style={styles.button} onPress={this.loginPress}>
                <Text style={styles.buttonText}>Entrar</Text>
              </Button>
            </View>
          </Image>
        );
    }
}

const styles = {
    loginBackgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        width: null,
        height: null,
    },
    loginView: {
        flex: 1,
        padding: 20,
    },
    loginImage: {
        width: 240,
        height: 195,
        alignSelf: 'center',
        marginBottom: 30,
    },
    facebook: {
        marginBottom: 15,
        backgroundColor: '#3b5998',
    },
    buttonNewUser: {
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    buttonText: {
        color: '#000',
    },
    haveAccount: {
        color: '#fff',
        alignSelf: 'center',
        marginBottom: 10,
    },
};

const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');
