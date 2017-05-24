import React, { Component } from 'react';
import { StyleProvider, Drawer } from 'native-base';

import educareTheme from './themes/educareTheme';

import SideBar from './SideBar';
import VisaoGeral from './VisaoGeral';

export default class App extends Component {

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <StyleProvider style={educareTheme}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()} >
          <VisaoGeral openDrawer={this.openDrawer} />
        </Drawer>
      </StyleProvider>
    );
  }
}