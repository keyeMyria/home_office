// @flow
import React, { Component } from 'react';
import { NativeModules, BackHandler, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider } from 'native-base';
import moment from 'moment';
import 'moment/locale/pt-br';

import './stores';
import navigator from './lib/navigator';
import pushHandler from './lib/push';
import { educareTheme } from './themes/educareTheme';

// Screens
import SplashScreen from './screens/SplashScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';
import StudentHomeRouter from './modules/student/AppRouter';

// Configure UIManager
const { UIManager } = NativeModules;
if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Prevent app for close with android back button;
if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', () => true);
}

// Configure moment locale
moment.locale('pt-br');
pushHandler.configureNotifications();

const AppRouter = StackNavigator(
    {
        SplashScreen: { screen: SplashScreen },
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
