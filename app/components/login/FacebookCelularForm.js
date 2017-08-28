// @flow
import React, { Component } from 'react';
import { View, Keyboard, Alert } from 'react-native';
import { Form, Item, Input, Button, Text, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

@observer
export default class FacebookCelularForm extends Component {
    actionSheet: any;

    props: {
        onSubmit: () => void,
    };

    @observable
    store = {
        telefone: '',
    };

    onSubmit = () => {
        Keyboard.dismiss(); // hide the keyboard
        const { telefone } = this.store;
        const _telefone = telefone.replace(/[^0-9]/g, '');
        if (!_telefone) {
            Alert.alert('Erro', 'Informe o telefone cadastrado na escola');
            return;
        }
        this.props.onSubmit(_telefone);
    };

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

    renderLoginButton() {
        return (
          <Button block onPress={this.onSubmit}>
            <Text style={{ color: '#fff' }}>Continuar</Text>
          </Button>
        );
    }

    render() {
        return (
          <View>
            <Form style={styles.loginForm}>
              {this.renderTelefone()}
            </Form>
            {this.renderLoginButton()}
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
