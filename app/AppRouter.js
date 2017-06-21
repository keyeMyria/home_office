import { StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ParentHomeRouter from './modules/parent/AppRouter';
import TeacherHomeRouter from './modules/teacher/AppRouter';

export default StackNavigator(
    {
        LoginScreen: { screen: LoginScreen },
        ParentHomeRouter: { screen: ParentHomeRouter },
        TeacherHomeRouter: { screen: TeacherHomeRouter },
    },
    {
        headerMode: 'none',
    },
);
