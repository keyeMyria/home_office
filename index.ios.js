import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';

import AppRouter from './app/AppRouter';
import CONFIG from './config';

const EducareApp = codePush({
    installMode: codePush.InstallMode.IMMEDIATE,
    deploymentKey: CONFIG.CODE_PUSH.iosKey,
})(AppRouter);

AppRegistry.registerComponent('educare', () => EducareApp);
