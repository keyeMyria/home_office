import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';

import AppRouter from './app/AppRouter';

const EducareApp = codePush({
    installMode: codePush.InstallMode.IMMEDIATE,
})(AppRouter);

AppRegistry.registerComponent('educare', () => EducareApp);
