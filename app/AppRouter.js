// @flow
import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider } from 'native-base';
import moment from 'moment';
import 'moment/locale/pt-br';

import './stores';
import navigator from './lib/navigator';
import pushHandler from './lib/push';
import { educareTheme } from './themes/educareTheme';

// Screens
import LoginScreen from './screens/LoginScreen';
import InitialScreen from './screens/InitialScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import SplashScreen from './screens/SplashScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';
import StudentHomeRouter from './modules/student/AppRouter';

// Configure UIManager
const { UIManager } = NativeModules;
if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Configure moment locale
moment.locale('pt-br');
pushHandler.configureNotifications();

const AppRouter = StackNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        InitialScreen: { screen: InitialScreen },
        LoginScreen: { screen: LoginScreen },
        CreateUserScreen: { screen: CreateUserScreen },
        TeacherHomeRouter: { screen: TeacherHomeRouter },
        ParentHomeRouter: { screen: ParentHomeRouter },
        StudentHomeRouter: { screen: StudentHomeRouter },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
);

export default class EducareApp extends Component {
    render() {
        return (
          <StyleProvider style={educareTheme}>
            <AppRouter ref={nav => navigator.setContainer(nav)} />
          </StyleProvider>
        );
    }
}
