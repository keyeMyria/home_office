import React, { Component } from 'react';
import { StyleProvider, Drawer } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

import educareTheme from './themes/educareTheme';
import SideBar from './SideBar';

@observer
export default class App extends Component {

  constructor(props) {
    super(props);
    store.selecionarUsuarioPai();
    store.navigate(0);
  }

  render() {
    return (
      <StyleProvider style={educareTheme}>
        <Drawer
          ref={(ref) => store.setDrawer(ref)}
          content={<SideBar />}
          onClose={store.closeDrawer} >
          {store.currentPage}
        </Drawer>
      </StyleProvider>
    );
  }
}