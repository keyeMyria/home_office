// @flow
import React, { Component } from 'react';
import { View, Image, Keyboard, Alert } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, ActionSheet, Icon } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import { AuthService } from '../services';

@observer
export default class LoginScreen extends Component {
    _service = new AuthService();

    @observable
    store = {
        loading: false,
        username: '',
        password: '',
    };

    actionSheet: any;

    showActionSheet() {
        const options = {
            options: LOGIN_OPTIONS,
            cancelButtonIndex: LOGIN_OPTIONS.length - 1,
            title: 'Entrar como...',
        };

        const callbackFunc = (buttonIndex: string) => {
            const index = parseInt(buttonIndex, 10);
            const routeName = ROUTER_OPTIONS[index];
            if (routeName) {
                this.props.navigation.navigate(routeName);
            }
        };

        this.actionSheet._root.showActionSheet(options, callbackFunc);
    }

    async login() {
        Keyboard.dismiss();
        const { username, password } = this.store;

        if (!this.store.username || !this.store.password) {
            this.showActionSheet();
            return null;
        }
        try {
            const user = await this._service.login(username, password);
            switch (user.user.role) {
            case 'ALUNO':
                this.props.navigation.navigate('StudentHomeRouter');
                break;
            default:
                this.showActionSheet();
                break;
            }
            return user;
        } catch (error) {
            if (error.response.status === 401) {
                Alert.alert('Dados Inválidos', 'O usuário ou senha informada são inválidos');
            } else {
                this.showActionSheet();
            }
            return null;
        }
    }

    renderUsername() {
        const onChange = val => (this.store.username = val);

        return (
          <Item style={styles.loginInput}>
            <Icon active name="mail-outline" />
            <Input placeholder="Email" value={this.store.username} onChangeText={onChange} />
          </Item>
        );
    }

    renderPassword() {
        const onChange = val => (this.store.password = val);
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

    render() {
        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <View style={styles.loginView}>
              <Thumbnail source={ICON_IMG} style={styles.loginImage} />
              <Form style={styles.loginForm}>
                {this.renderUsername()}
                {this.renderPassword()}
              </Form>
              {this.renderLoginButton()}
              <Text style={styles.forgotPassword}>Esqueceu a Senha?</Text>
              <View style={{ flex: 1 }} />
              <Button block style={styles.facebook}>
                <Text>Entrar com Facebook</Text>
              </Button>
              <ActionSheet
                ref={(c) => {
                    this.actionSheet = c;
                }}
              />
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

const LOGIN_OPTIONS = ['Pai ou Responsável', 'Professor', 'Cancelar'];
const ROUTER_OPTIONS = ['ParentHomeRouter', 'TeacherHomeRouter'];

const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');
