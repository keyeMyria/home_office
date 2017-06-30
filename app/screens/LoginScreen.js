/* @flow */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, ActionSheet, Icon } from 'native-base';

const LOGIN_OPTIONS = ['Pai ou Responsável', 'Professor', 'Aluno', 'Coordenador', 'Cancelar'];
const ROUTER_OPTIONS = ['ParentHomeRouter', 'TeacherHomeRouter', 'StudentHomeRouter'];

// const BG_IMG = require('../img/login.jpg');
const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');

export default class LoginScreen extends Component {

    actionSheet: any;

    /**
     * Handle the Login submission and redirects the user to the apropriate route
     */
    handleSubmit() {
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

    render() {
        const handleSubmit = () => this.handleSubmit();
        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <View style={styles.loginView}>
              <Thumbnail source={ICON_IMG} style={styles.loginImage} />
              <Form style={styles.loginForm}>
                <Item style={styles.loginInput}>
                  <Icon active name="mail-outline" />
                  <Input placeholder="Email" />
                </Item>
                <Item style={styles.loginInput}>
                  <Icon active name="lock-outline" />
                  <Input placeholder="Senha" secureTextEntry />
                </Item>
              </Form>
              <Button block onPress={handleSubmit}>
                <Text>Entrar</Text>
              </Button>
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
