/* @flow */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, ActionSheet, Icon } from 'native-base';

const LOGIN_OPTIONS = ['Pai ou Responsável', 'Professor', 'Aluno', 'Coordenador', 'Cancelar'];
const ROUTER_OPTIONS = ['ParentHomeRouter', 'TeacherHomeRouter', 'StudentHomeRouter'];

// const BG_IMG = require('../img/login.jpg');
const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');

// import { AnoService, DisciplinaService } from '../services';

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

    // async httpTest() {
    //     const anoService = new AnoService();
    //     const disciplinaService = new DisciplinaService();

    //     const anos = await anoService.get();
    //     console.log('[RESULT] anos', anos);

    //     const disciplina = await anoService.one(1).all('disciplinas').one(1).get();
    //     console.log('[RESULT] disciplina 1', disciplina);

    //     const ano1 = await anoService.one(1).get();
    //     const disciplinas = await ano1.link.disciplinas.get();
    //     console.log('[RESULT] disciplinas do ano 1', disciplinas);

    //     const anosByProfessor = await anoService.findByProfessor(5);
    //     console.log('[RESULT] anos do professor 5', anosByProfessor);

    //     const responsabilidades = await disciplina.link.responsabilidades.get();
    //     console.log('[RESULT] responsabilidades da disciplina 1', responsabilidades);

    //     anoService.one(1).all('disciplinas').patch(disciplinaService.one(10));
    //     console.log('[RESULT] add discplina 10 no ano 1');
    // }

    render() {
        const handleSubmit = () => this.handleSubmit();

        // this.httpTest();

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
