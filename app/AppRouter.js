// @flow

import { StackNavigator } from 'react-navigation';
import moment from 'moment';
import 'moment/locale/pt-br';

// Load stores
import './stores/UiStore';
import './stores/UserStore';

import LoginScreen from './screens/LoginScreen';
import InitialScreen from './screens/InitialScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import SplashScreen from './screens/SplashScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';
import StudentHomeRouter from './modules/student/AppRouter';

// Configure moment locale
moment.locale('pt-br');

export default StackNavigator(
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
