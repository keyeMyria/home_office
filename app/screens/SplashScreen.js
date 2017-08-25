// @flow
import React, { Component } from 'react';
import { View, Image, LayoutAnimation, KeyboardAvoidingView } from 'react-native';
import { Thumbnail } from 'native-base';
// import { NavigationActions } from 'react-navigation';

import { autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import navigator from './../lib/navigator';

import SelectSchool from './../components/login/SelectSchool';
import SelectLoginMode from './../components/login/SelectLoginMode';
import BackButton from './../components/login/BackButton';
import LoginForm from './../components/login/LoginForm';

import uiStore from './../stores/UiStore';
import escolaStore from './../stores/EscolaStore';
import userStore from './../stores/UserStore';

@observer
export default class SplashScreen extends Component {
    disposerFinishInit: () => {};
    disposerHasEscola: () => {};
    disposerHasAuth: () => {};

    state: {
        hasEscola: boolean,
        hasUser: boolean,
        finishInit: boolean,
        loginMode: ?string,
        keyboardIsVisible: boolean,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            hasEscola: false,
            hasUser: false,
            finishInit: false,
            loginMode: null,
            keyboardIsVisible: false,
        };
    }

    componentDidMount() {
        this.disposerFinishInit = autorun(() => {
            if (uiStore.appFinishInit !== this.state.finishInit) {
                this.setState({ finishInit: uiStore.appFinishInit });
            }
            if (uiStore.keyboardIsVisible !== this.state.keyboardIsVisible) {
                this.setState({ keyboardIsVisible: uiStore.keyboardIsVisible });
            }
        });

        this.disposerHasEscola = autorun(() => {
            if (escolaStore.hasEscolaSelected !== this.state.hasEscola) {
                this.setState({ hasEscola: escolaStore.hasEscolaSelected });
            }
        });

        this.disposerHasAuth = autorun(() => {
            if (userStore.hasAuth) {
                navigator.reset(userStore.homeScreen);
            }
        });
    }

    componentWillUnmount() {
        this.disposerFinishInit();
        this.disposerHasEscola();
        this.disposerHasAuth();
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    selectEscola = (escola: any) => {
        escolaStore.selectEscola(escola.escola, escola.api);
    };

    selectLoginMode = (mode: string) => {
        this.setState({ loginMode: mode });
    };

    renderSelectSchool() {
        return <SelectSchool onSelectEscola={this.selectEscola} />;
    }

    renderSelectLoginMode() {
        return <SelectLoginMode onPress={this.selectLoginMode} />;
    }

    renderLoginForm() {
        return <LoginForm />;
    }

    facebookPress = () => {};

    renderView() {
        if (!this.state.finishInit) return null;

        if (!this.state.hasEscola) {
            return this.renderSelectSchool();
        } else if (!this.state.loginMode) {
            return this.renderSelectLoginMode();
        } else if (!this.state.hasUser) {
            switch (this.state.loginMode) {
            case 'PASSWORD':
                return this.renderLoginForm();
            default:
                break;
            }
        }
        return null;
    }

    handleBackButton = () => {
        if (this.state.loginMode) {
            this.setState({ loginMode: null });
        } else if (this.state.hasEscola) {
            escolaStore.clear();
        }
    };

    render() {
        const keyboardIsVisible = this.state.keyboardIsVisible;
        let logoStyles = styles.loginImage;
        if (keyboardIsVisible) {
            logoStyles = Object.assign({}, logoStyles, {
                marginTop: 50,
                width: logoStyles.width * 0.5,
                height: logoStyles.height * 0.5,
            });
        }

        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <KeyboardAvoidingView style={styles.loginView} mode="padding">
              <BackButton onPress={this.handleBackButton} visible={this.state.hasEscola} />
              {!keyboardIsVisible && <View style={{ flex: 1 }} />}
              <Thumbnail source={ICON_IMG} style={logoStyles} />
              <View style={{ flex: 1, paddingBottom: 15 }}>
                {this.renderView()}
              </View>
            </KeyboardAvoidingView>
          </Image>
        );
    }
}

const deviceWidth = uiStore.windowWidth;

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
        // height: 568,
        // borderWidth: 1,
    },
    loginImage: {
        get width() {
            if (deviceWidth < 360) return 180;
            return 240;
        },
        get height() {
            if (deviceWidth < 360) return 146;
            return 195;
        },
        alignSelf: 'center',
        marginBottom: 30,
        tintColor: '#fff',
        zIndex: 10000,
    },
};

const BG_IMG = require('../img/bg.png');
const ICON_IMG = require('../img/logo.png');
