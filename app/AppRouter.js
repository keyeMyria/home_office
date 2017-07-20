// @flow

import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';
import StudentHomeRouter from './modules/student/AppRouter';

export default StackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    TeacherHomeRouter: { screen: TeacherHomeRouter },
    ParentHomeRouter: { screen: ParentHomeRouter },
    StudentHomeRouter: { screen: StudentHomeRouter },
  },
  {
    headerMode: 'none',
  }
);
