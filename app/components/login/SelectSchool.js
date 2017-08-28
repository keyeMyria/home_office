import React, { Component } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Picker } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import escolaStore from './../../stores/EscolaStore';

@observer
export default class SelectSchool extends Component {
    @observable selectedEscola: number = 0;

    props: {
        onSelectEscola: () => void,
    };

    state: {
        escolas: ?Array<Object>,
        loading: boolean,
        error: boolean,
    };

    constructor(props) {
        super(props);
        this.state = {
            escolas: null,
            loading: true,
            error: false,
        };
    }

    componentWillMount() {
        escolaStore
            .getEscolas()
            .then((escolas) => {
                this.setState({ loading: false, escolas });
            })
            .catch(() => {
                this.setState({ loading: false, error: true });
            });
    }

    selectEscola = () => {
        if (this.selectedEscola) {
            const escola = this.state.escolas[this.selectedEscola - 1];
            if (escola) {
                this.props.onSelectEscola(escola);
            }
            this.setState({ loading: true });
        } else {
            Alert.alert('Erro', 'Selecione uma escola');
        }
    };

    setValue = (value: any) => {
        this.selectedEscola = value;
    };

    renderEscolaPicker = (escolas: Array<Object>) => {
        if (escolas.length === 0) return this.renderError();
        return (
          <View style={{ padding: 15 }}>
            <Picker
              iosHeader="Selecione uma escola"
              mode="dialog"
              headerBackButtonText="Voltar"
              selectedValue={this.selectedEscola}
              onValueChange={this.setValue}
              style={styles.picker}
            >
              {[{ escola: 'Selecionar escola...', api: '' }].concat(...escolas).map(
                        ({ escola }, index) =>
                            <Picker.Item key={index} value={index} label={escola} />, //eslint-disable-line
                    )}
            </Picker>
            <Button block onPress={this.selectEscola}>
              <Text style={{ color: '#fff' }}>Prosseguir</Text>
            </Button>
          </View>
        );
    };

    renderLoading = () =>
      (<View
        style={{ backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', padding: 15 }}
      >
        <ActivityIndicator size="large" />
        <Text>Carregando</Text>
      </View>);

    renderError = () => {
        const msg =
            'Ocorreu um erro ao tentar acessar o servidor. \n\n Verifique sua conexão com a internet, ou entre em contato com o suporte.';

        return (
          <View style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: 10 }}>
            <Text style={{ color: '#fff' }}>
              {msg}
            </Text>
          </View>
        );
    };

    render() {
        if (this.state.loading) {
            return this.renderLoading();
        } else if (this.state.error) {
            return this.renderError();
        }
        return this.renderEscolaPicker(this.state.escolas);
    }
}

const styles = {
    picker: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
        marginBottom: 15,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    },
};
