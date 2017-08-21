// @flow
import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { Button, Text, Thumbnail, Icon } from 'native-base';

import { when } from 'mobx';
import { observer } from 'mobx-react/native';

import escolaStore from './../stores/EscolaStore';
import facebookLogin from './../lib/facebookLogin';
import userStore from './../stores/UserStore';
import uiStore from './../stores/UiStore';

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
        facebookLogin
            .login()
            .then((token) => {
                if (token) {
                    facebookLogin.sendTokenToServer(token).then((jwt) => {
                        if (jwt) {
                            userStore.loginToken(jwt);
                        } else {
                            this.props.navigation.navigate('CreateUserScreen', { token });
                        }
                    });
                }
            })
            .catch(() => {
                Alert.alert('Erro', 'Não foi possível logar usando o facebook');
            });
    };

    loginPress = () => {
        this.props.navigation.navigate('LoginScreen');
    };

    newUserPress = () => {
        this.props.navigation.navigate('CreateUserScreen');
    };

    handleBackAction = () => {
        escolaStore.clear();
        this.props.navigation.goBack();
    }

    render() {
        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <View style={styles.loginView}>
              {
                    !uiStore.keyboardIsVisible ?

                      <Button
                        onPress={this.handleBackAction}
                        transparent
                        style={{
                            backgroundColor: '#fff',
                            position: 'absolute',
                            paddingLeft: 2,
                            zIndex: 20,
                            top: 30,
                            left: 20,
                        }}
                      >
                        <Icon
                          name="chevron-left"
                          style={{
                              color: '#757575',
                              fontSize: 28,
                          }}
                        />
                        <Text style={{
                            color: '#757575',
                            fontWeight: 'bold',
                            fontSize: 18,
                            top: 2,
                        }}
                        >
                            Voltar
                        </Text>
                      </Button>

                    : null
                }
              <View style={{ flex: 1 }} />
              <Thumbnail source={ICON_IMG} style={styles.loginImage} />
              <View style={{ flex: 1 }} />
              <Button block style={styles.button} success onPress={this.newUserPress}>
                <Text style={styles.buttonText}>Criar novo Usuário</Text>
              </Button>
              <Button block style={styles.facebook} onPress={this.facebookPress}>
                <Text style={{ color: 'white' }}>Continuar com Facebook</Text>
              </Button>
              <Text style={styles.haveAccount}>Já possui usuário e senha?</Text>
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
        margin: 30,
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
        backgroundColor: 'rgba(0,0,0,0)',
        alignSelf: 'center',
        marginBottom: 10,
    },
};

const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');
