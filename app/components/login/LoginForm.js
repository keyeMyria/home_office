// @flow
import React, { Component } from 'react';
import { View, Keyboard, LayoutAnimation, ActivityIndicator } from 'react-native';
import { Form, Item, Input, Button, Text, ActionSheet, Icon } from 'native-base';

import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import userStore from './../../stores/UserStore';

type State = {
    loading: boolean,
};

@observer
export default class LoginScreen extends Component {
    actionSheet: any;
    disposerLoading: () => {};

    state: State = {
        loading: false,
    };

    @observable
    store = {
        username: '',
        password: '',
    };

    componentWillMount() {
        this.disposerLoading = autorun(() => {
            if (userStore.loading !== this.state.loading) {
                this.setState({ loading: !!userStore.loading });
            }
        });
    }

    componentWillUnmount() {
        this.disposerLoading();
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

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

    renderLoading() {
        return (
          <View
            style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                alignItems: 'center',
                padding: 15,
            }}
          >
            <ActivityIndicator size="large" />
            <Text>Carregando</Text>
          </View>
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
            <Text style={{ color: '#fff' }}>Entrar</Text>
          </Button>
        );
    }

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        }

        return (
          <View>
            <Form style={styles.loginForm}>
              {this.renderUsername()}
              {this.renderPassword()}
            </Form>
            {this.renderLoginButton()}
            {__DEV__ &&
            <ActionSheet
              ref={(c) => {
                  this.actionSheet = c;
              }}
            />}
          </View>
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
    loginForm: {
        marginTop: 20,
        marginBottom: 20,
    },
    loginInput: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        marginLeft: 0,
    },
};

const LOGIN_MOCK = [
    { name: 'PROFESSOR', username: 'professor@ed.com', password: 'iogurte' },
    { name: 'RESPONSAVEL', username: 'responsavel', password: 'iogurte' },
    { name: 'ALUNO', username: 'aluno', password: 'iogurte' },
];
