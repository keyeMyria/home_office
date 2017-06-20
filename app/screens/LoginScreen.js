import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Form, Item, Input, Button, Text, Thumbnail, Title, ActionSheet } from 'native-base';

const LOGIN_OPTIONS = ['Pai ou Responsável', 'Professor', 'Aluno', 'Coordenador', 'Cancelar'];
const ROUTER_OPTIONS = ['ParentHomeRouter', 'TeacherHomeRouter'];

const BG_IMG = require('../img/login.jpg');
const ICON_IMG = require('../img/icon.png');

export default class LoginScreen extends Component {

    /**
     * Handle the Login submission and redirects the user to the apropriate route
     */
    handleSubmit() {
        const options = {
            options: LOGIN_OPTIONS,
            cancelButtonIndex: LOGIN_OPTIONS.length - 1,
            title: 'Entrar como...',
        };

        const callbackFunc = (buttonIndex) => {
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
              <Title style={styles.loginTitle}>EducareBox</Title>
              <Form style={styles.loginForm}>
                <Item rounded style={styles.loginInput}>
                  <Input placeholder="Email" />
                </Item>
                <Item rounded style={styles.loginInput}>
                  <Input placeholder="Senha" secureTextEntry />
                </Item>
              </Form>
              <Button rounded block onPress={handleSubmit}>
                <Text>Entrar</Text>
              </Button>
            </View>
            <ActionSheet
              ref={(c) => {
                  this.actionSheet = c;
              }}
            />
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
        backgroundColor: 'transparent',
    },
    loginView: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    loginForm: {
        marginTop: 20,
        marginBottom: 20,
    },
    loginInput: {
        backgroundColor: '#FFFFFF',
        marginTop: 2,
    },
    loginImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
    },
    loginTitle: {
        fontSize: 25,
        color: '#000000',
    },
};
