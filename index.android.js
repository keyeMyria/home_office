// @flow
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StyleProvider } from 'native-base';
import codePush from 'react-native-code-push';

// Redux Form Store
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Theme
import { educareTheme } from './app/themes/educareTheme';

import pushHandler from './app/lib/push';
import allReducers from './app/reducers';
import AppRouter from './app/AppRouter';

const formStore = createStore(allReducers);

pushHandler.configureNotifications();

@codePush({
    installMode: codePush.InstallMode.IMMEDIATE,
})
class EducareApp extends Component {
    render() {
        return (
          <Provider store={formStore}>
            <StyleProvider style={educareTheme}>
              <AppRouter />
            </StyleProvider>
          </Provider>
        );
    }
}

AppRegistry.registerComponent('educare', () => EducareApp);
