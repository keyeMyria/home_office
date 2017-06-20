import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StyleProvider } from 'native-base';

// Redux Form Store
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import allReducers from './app/reducers';
// Theme
import { educareTheme } from './app/themes/educareTheme';

import AppRouter from './app/AppRouter';

const formStore = createStore(allReducers);

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
