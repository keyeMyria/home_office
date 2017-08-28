// @flow
import React, { Component } from 'react';
import { View, Keyboard, Alert } from 'react-native';
import { Form, Item, Input, Button, Text, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import EventEmitter from 'react-native-eventemitter';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import LoadingIndicator from './LoadingIndicator';

@observer
export default class LoginScreen extends Component {
    actionSheet: any;

    props: {
        onSubmit: any => {},
    };

    state = {
        loading: false,
    };

    @observable
    store = {
        telefone: '',
        email: '',
        senha: '',
        confirmaSenha: '',
    };

    onCreateUserError = ({ message }: { message: string }) => {
        Alert.alert('Error', message);
        this.setState({ loading: false });
    };

    componentWillMount() {
        EventEmitter.on('auth.create_user_error', this.onCreateUserError);
    }

    componentWillUnmount() {
        EventEmitter.off('auth.create_user_error', this.onCreateUserError);
    }

    onSubmit = () => {
        Keyboard.dismiss();
        const data = this.validate();
        if (data) {
            this.setState({ loading: true });
            this.props.onSubmit(data);
        }
    };

    validate() {
        const { telefone, email, senha, confirmaSenha } = this.store;
        const celular = telefone.replace(/[^0-9]/g, '');

        if (!celular) {
            Alert.alert('Erro', 'Informe o telefone cadastrado na escola');
            return null;
        } else if (!email) {
            Alert.alert('Erro', 'Informe um email válido');
            return null;
        } else if (!senha) {
            Alert.alert('Erro', 'Informe uma senha');
            return null;
        } else if (senha !== confirmaSenha) {
            Alert.alert('Erro', 'A senha é diferente da confirmação de senha');
            return null;
        }
        return { celular, email, senha };
    }

    renderTelefone() {
        const onChange = (val) => {
            this.store.telefone = val;
        };

        return (
          <Item style={styles.loginInput}>
            <Icon active name="phone" />
            <TextInputMask
              type="cel-phone"
              placeholder="Telefone cadastrado na escola"
              value={this.store.telefone}
              onChangeText={onChange}
              customTextInput={Input}
            />
          </Item>
        );
    }

    renderField(label: string, icon: string, key: string, options: * = {}) {
        const onChange = (val) => {
            this.store[key] = val;
        };
        return (
          <Item style={styles.loginInput}>
            <Icon active name={icon} />
            <Input
              placeholder={label}
              value={this.store[key]}
              onChangeText={onChange}
              {...options}
            />
          </Item>
        );
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />;
        }

        return (
          <View>
            <Form style={styles.loginForm}>
              {this.renderTelefone()}
              {this.renderField('Email', 'mail-outline', 'email', {
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  keyboardType: 'email-address',
              })}
              {this.renderField('Senha', 'lock-outline', 'senha', {
                  secureTextEntry: true,
              })}
              {this.renderField('Confirmar Senha', 'lock-outline', 'confirmaSenha', {
                  secureTextEntry: true,
              })}
            </Form>
            <Button block onPress={this.onSubmit}>
              <Text>Criar Usuário</Text>
            </Button>
            <View style={{ flex: 1 }} />
          </View>
        );
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
