// @flow
import React, { Component } from 'react';
import { View, Image, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Thumbnail, Picker } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { observable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { observer } from 'mobx-react/native';

import uiStore from './../stores/UiStore';
import escolaStore from './../stores/EscolaStore';
import userStore from './../stores/UserStore';

@observer
export default class SplashScreen extends Component {
    escolasPromise: any;
    @observable selectedEscola: number = 0;

    selectEscola = () => {
        if (this.selectedEscola) {
            const escola = this.escolasPromise.value[this.selectedEscola - 1];
            if (escola) {
                escolaStore.selectEscola(escola.escola, escola.api).then(() => {
                    this.forceUpdate();
                });
            }
        } else {
            Alert.alert('Erro', 'Selecione uma escola');
        }
    };

    componentWillMount() {
        if (uiStore.appFinishInit && escolaStore.hasEscolaSelected) {
            if (userStore.hasAuth) {
                this._navigateTo(userStore.homeScreen);
            } else {
                this._navigateTo('InitialScreen');
            }
        }
    }

    componentDidUpdate() {
        if (uiStore.appFinishInit && escolaStore.hasEscolaSelected) {
            if (userStore.hasAuth) {
                this._navigateTo(userStore.homeScreen);
            } else {
                this._navigateTo('InitialScreen');
            }
        }
    }

    _navigateTo = (routeName: string) => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })],
        });
        this.props.navigation.dispatch(resetAction);
    };

    setValue = (value: any) => {
        this.selectedEscola = value;
    };

    renderEscolaPicker = (escolas: Array<Object>) => {
        if (escolas.length === 0) return this.renderError();
        return (
          <View style={{ backgroundColor: '#fff', padding: 15 }}>
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
              <Text>Prosseguir</Text>
            </Button>
          </View>
        );
    };

    renderLoading = () =>
      (<View style={{ backgroundColor: '#fff', alignItems: 'center', padding: 15 }}>
        <ActivityIndicator size="large" />
        <Text>Carregando</Text>
      </View>);

    renderError = () => {
        const msg =
            'Ocorreu um erro ao tentar acessar o servidor. \n\n Verifique sua conexão com a internet, ou entre em contato com o suporte.';

        return (
          <View style={{ backgroundColor: '#f00', padding: 10 }}>
            <Text style={{ color: '#fff' }}>
              {msg}
            </Text>
          </View>
        );
    };

    loadEscolas = () => {
        if (!this.escolasPromise) {
            this.escolasPromise = fromPromise(escolaStore.getEscolas());
        }

        return this.escolasPromise.case({
            pending: this.renderLoading,
            rejected: this.renderError,
            fulfilled: this.renderEscolaPicker,
        });
    };

    render() {
        let view = this.renderLoading;

        if (uiStore.appFinishInit) {
            if (!escolaStore.hasEscolaSelected) {
                view = this.loadEscolas;
            }
        }

        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <View style={styles.loginView}>
              <Thumbnail source={ICON_IMG} style={styles.loginImage} />
              {view()}
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
        marginBottom: 30,
    },
    haveAccount: {
        alignSelf: 'center',
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
        marginBottom: 15,
        alignSelf: 'stretch',
    },
};

const BG_IMG = require('../img/bg.jpg');
const ICON_IMG = require('../img/logo.png');
