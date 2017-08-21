// @flow
import React, { Component } from 'react';
import { View, Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, ActionSheet, Icon } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import escolaStore from './../stores/EscolaStore';
import uiStore from './../stores/UiStore';
import userStore from './../stores/UserStore';

@observer
export default class LoginScreen extends Component {
    actionSheet: any;

    @observable
    store = {
        username: '',
        password: '',
    };

    /**
     * Handle the button click
     */
    async login() {
        Keyboard.dismiss(); // hide the keyboard
        const { username, password } = this.store;
        // Show action sheet if username or password are blank
        if (username && password) {
            userStore.login(username, password);
        } else {
            this.showActionSheet();
        }
    }

    renderUsername() {
        const onChange = (val) => {
            this.store.username = val;
        };

        return (
          <Item style={styles.loginInput}>
            <Icon active name="mail-outline" />
            <Input placeholder="Email" value={this.store.username} onChangeText={onChange} />
          </Item>
        );
    }

    renderPassword() {
        const onChange = (val) => {
            this.store.password = val;
        };
        return (
          <Item style={styles.loginInput}>
            <Icon active name="lock-outline" />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={this.store.password}
              onChangeText={onChange}
            />
          </Item>
        );
    }

    renderLoginButton() {
        const onPress = () => this.login();
        return (
          <Button block onPress={onPress}>
            <Text>Entrar</Text>
          </Button>
        );
    }

    handleBackAction = () => {
        escolaStore.clear();
        this.props.navigation.goBack();
    }

    render() {
        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <KeyboardAvoidingView style={styles.loginView}>
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
              {!uiStore.keyboardIsVisible && <View style={{ flex: 1 }} />}
              {!uiStore.keyboardIsVisible &&
                <Thumbnail source={ICON_IMG} style={styles.loginImage} />}
              <Form style={styles.loginForm}>
                {this.renderUsername()}
                {this.renderPassword()}
              </Form>
              {this.renderLoginButton()}
              {/* <Text style={styles.forgotPassword}>Esqueceu a Senha?</Text> */}
              <View style={{ flex: 1 }} />
              {__DEV__ &&
                <ActionSheet
                  ref={(c) => {
                      this.actionSheet = c;
                  }}
                />}
            </KeyboardAvoidingView>
          </Image>
        );
    }

    /**
     * This only shows in development mode
     */
    showActionSheet(): void {
        // eslint-disable-next-line no-undef
        if (__DEV__) {
            const options = {
                options: LOGIN_MOCK.map(o => o.name).concat('Cancelar'),
                cancelButtonIndex: LOGIN_MOCK.length,
                title: 'Entrar como...',
            };

            this.actionSheet._root.showActionSheet(options, (buttonIndex: string) => {
                const index = parseInt(buttonIndex, 10);
                const mock = LOGIN_MOCK[index];
                if (!mock) return;

                this.store.username = mock.username;
                this.store.password = mock.password;
                this.login();
            });
        }
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
    loginForm: {
        marginTop: 20,
        marginBottom: 20,
    },
    loginInput: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        marginLeft: 0,
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
    forgotPassword: {
        color: '#fff',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
};

const LOGIN_MOCK = [
    { name: 'PROFESSOR', username: 'professor', password: 'iogurte' },
    { name: 'RESPONSAVEL', username: 'responsavel', password: 'iogurte' },
    { name: 'ALUNO', username: 'aluno', password: 'iogurte' },
];

const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');
