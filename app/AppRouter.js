// @flow

import { StackNavigator } from 'react-navigation';
import moment from 'moment';
import 'moment/locale/pt-br';

import LoginScreen from './screens/LoginScreen';
import InitialScreen from './screens/InitialScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';
import StudentHomeRouter from './modules/student/AppRouter';

// Configure moment locale
moment.locale('pt-br');

export default StackNavigator(
    {
        InitialScreen: { screen: InitialScreen },
        LoginScreen: { screen: LoginScreen },
        TeacherHomeRouter: { screen: TeacherHomeRouter },
        ParentHomeRouter: { screen: ParentHomeRouter },
        StudentHomeRouter: { screen: StudentHomeRouter },
    },
    {
        headerMode: 'none',
    },
);
