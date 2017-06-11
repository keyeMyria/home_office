import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StyleProvider } from 'native-base';

// Theme
import { educareTheme } from './app/themes/educareTheme';

// Redux Form Store
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './app/reducers';
const formStore = createStore(allReducers);

// import AppRouter from './app/modules/parent/AppRouter';
import AppRouter from './app/modules/teacher/AppRouter';

export class EducareApp extends Component {

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