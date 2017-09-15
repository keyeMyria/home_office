// @flow
import React, { Component } from 'react';
import {
    View,
    Image,
    LayoutAnimation,
    KeyboardAvoidingView,
    ActivityIndicator,
    BackHandler,
    Platform,
    Dimensions,
} from 'react-native';
import { Thumbnail, Text } from 'native-base';
import EventEmitter from 'react-native-eventemitter';
import _ from 'lodash';

import { autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import navigator from './../lib/navigator';

import SelectSchool from './../components/login/SelectSchool';
import SelectLoginMode from './../components/login/SelectLoginMode';
import BackButton from './../components/login/BackButton';
import LoginForm from './../components/login/LoginForm';
import FacebookCelularForm from './../components/login/FacebookCelularForm';
import CreateUserForm from './../components/login/CreateUserForm';
import CodePushStatus from './../components/login/CodePushStatus';

import uiStore from './../stores/UiStore';
import escolaStore from './../stores/EscolaStore';
import userStore from './../stores/UserStore';
import logger from './../lib/logger';

@observer
export default class SplashScreen extends Component {
    disposerFinishInit: () => {};
    onFacebookError: () => {};

    state: {
        hasEscola: boolean,
        hasUser: boolean,
        // finishInit: boolean,
        loginMode: ?string,
        keyboardIsVisible: boolean,
        needTelefone: boolean,
        screen: 'SPLASH' | 'ESCOLA' | 'MODE' | 'LOGIN' | 'FACEBOOK' | 'NEW_USER' | 'CODE_PUSH',
        loading: boolean,
        codePushStatus: string,
        codePushDownloadPercent: number,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            hasEscola: false,
            hasUser: false,
            loginMode: null,
            keyboardIsVisible: false,
            needTelefone: false,
            screen: 'SPLASH',
            loading: false,
        };
    }

    componentDidMount() {
        const onFacebookError = ({ type }) => {
            if (type === 'EMAIL_NOT_FOUND') {
                this.setState({ screen: 'FACEBOOK' });
            }
            this.setState({ loading: false });
        };
        EventEmitter.on('auth.facebook_login_error', onFacebookError);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.onFacebookError = onFacebookError;

        this.disposerFinishInit = autorun(() => {
            try {
                const state = {};
                // if (!uiStore.codePushUpToDate) {
                if (!uiStore.codePushUpToDate) {
                    this.setState({
                        screen: 'CODE_PUSH',
                        codePushStatus: uiStore.codePushStatus,
                        codePushDownloadPercent: uiStore.codePushDownloadPercent,
                    });
                    return;
                }
                if (!uiStore.appFinishInit) return;
                if (userStore.hasAuth) {
                    navigator.reset(userStore.homeScreen);
                    return;
                }

                if (this.state.screen === 'SPLASH') {
                    state.screen = 'MODE';
                }

                if (uiStore.keyboardIsVisible !== this.state.keyboardIsVisible) {
                    this.setState({ keyboardIsVisible: uiStore.keyboardIsVisible });
                }

                if (!escolaStore.hasEscolaSelected) {
                    state.screen = 'ESCOLA';
                } else if (this.state.screen === 'ESCOLA') {
                    state.screen = 'MODE';
                }

                if (!_.isEmpty(state)) this.setState(state);
            } catch (error) {
                logger.warn('', error);
                logger.error(error);
            }
        });
    }

    componentWillUnmount() {
        this.disposerFinishInit();
        EventEmitter.off('auth.facebook_login_error', this.onFacebookError);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    shouldComponentUpdate(newProps: any, newState: any) {
        if (newProps === this.props && newState === this.state) return false;
        return !_.isEqual(newProps, this.props) || !_.isEqual(newState, this.state);
    }

    renderSelectSchool() {
        const selectEscola = (escola: any) => {
            escolaStore.selectEscola(escola.escola, escola.api);
        };
        return <SelectSchool onSelectEscola={selectEscola} />;
    }

    renderSelectLoginMode() {
        const selectLoginMode = (mode: string) => {
            if (mode === 'FACEBOOK') {
                userStore.loginFacebook();
                this.setState({ loading: true });
            } else if (mode === 'PASSWORD') {
                this.setState({ screen: 'LOGIN' });
            } else if (mode === 'NEW_USER') {
                this.setState({ screen: 'NEW_USER' });
            }
        };
        return <SelectLoginMode onPress={selectLoginMode} />;
    }

    renderLoginForm() {
        return <LoginForm />;
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

    renderFacebookCelular() {
        return <FacebookCelularForm onSubmit={this.facebookWithTelefonePress} />;
    }

    renderNewUser() {
        const onSubmit = data => userStore.newUser(data);
        return <CreateUserForm onSubmit={onSubmit} />;
    }

    renderCodePush() {
        return (
          <CodePushStatus
            percent={this.state.codePushDownloadPercent}
            status={this.state.codePushStatus}
          />
        );
    }

    facebookWithTelefonePress = (telefone: string) => {
        userStore.loginFacebook(telefone);
        this.setState({ loading: true });
    };

    renderView() {
        const screen = this.state.screen;
        if (this.state.loading) return this.renderLoading();

        if (screen === 'SPLASH') return null;
        if (screen === 'ESCOLA') return this.renderSelectSchool();
        if (screen === 'MODE') return this.renderSelectLoginMode();
        if (screen === 'LOGIN') return this.renderLoginForm();
        if (screen === 'FACEBOOK') return this.renderFacebookCelular();
        if (screen === 'NEW_USER') return this.renderNewUser();
        if (screen === 'CODE_PUSH') return this.renderCodePush();
        return null;
    }

    handleBackButton = () => {
        const screen = this.state.screen;
        if (screen === 'LOGIN') {
            this.setState({ screen: 'MODE' });
        } else if (screen === 'MODE') {
            escolaStore.clear();
        } else if (screen === 'NEW_USER') {
            this.setState({ screen: 'MODE' });
        } else if (screen === 'FACEBOOK') {
            this.setState({ screen: 'MODE' });
        }
        return true;
    };

    render() {
        const { keyboardIsVisible } = this.state;
        let logoStyles = styles.loginImage;
        const backButtonVisible =
            this.state.screen !== 'ESCOLA' &&
            this.state.screen !== 'SPLASH' &&
            this.state.screen !== 'CODE_PUSH';

        if (keyboardIsVisible) {
            logoStyles = Object.assign({}, logoStyles, {
                marginTop: 20,
                width: logoStyles.width * 0.5,
                height: logoStyles.height * 0.5,
            });
        }
        const isIphone5 = Dimensions.get('window').width < 360 && Platform.OS === 'ios';
        const viewStyle = { paddingBottom: 15 };

        if (keyboardIsVisible && isIphone5) {
            // viewStyle = { paddingBottom: 15, marginTop: -50 };
            logoStyles = Object.assign({}, logoStyles, {
                marginTop: 0,
                width: logoStyles.width * 0.1,
                height: logoStyles.height * 0.1,
                opacity: 0,
            });
        }
        const RootView = Platform.select({ ios: KeyboardAvoidingView, android: View });
        const rootViewProps = Platform.select({
            ios: { style: styles.loginView, mode: 'height' },
            android: { style: styles.loginView },
        });

        return (
          <Image source={BG_IMG} style={styles.loginBackgroundImage}>
            <BackButton onPress={this.handleBackButton} visible={backButtonVisible} />
            <RootView {...rootViewProps}>
              {!keyboardIsVisible && <View style={{ flex: 1 }} />}
              <Thumbnail square source={ICON_IMG} style={logoStyles} />
              {!keyboardIsVisible && <View style={{ flex: 1 }} />}
              <View style={viewStyle}>{this.renderView()}</View>
            </RootView>
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
        get alignItems() {
            if (Platform.OS === 'ios') {
                return 'flex-start';
            }
            return 'center';
        },
        width: null,
        height: null,
    },
    loginView: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    loginImage: {
        get width() {
            if (deviceWidth < 361) return 180;
            return 240;
        },
        get height() {
            if (deviceWidth < 361) return 146;
            return 195;
        },
        alignSelf: 'center',
        marginBottom: 30,
        tintColor: '#fff',
        zIndex: 10000,
    },
};

const BG_IMG = require('../img/bg_gradient.png');
const ICON_IMG = require('../img/logo.png');
