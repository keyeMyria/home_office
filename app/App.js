import React, { Component } from 'react';
import { StyleProvider, Drawer } from 'native-base';

import educareTheme from './themes/educareTheme';

import SideBar from './SideBar';
import VisaoGeral from './VisaoGeral';
import Mensagens from './Mensagens';
import Historico from './Historico';
import CargaExercicios from './CargaExercicios';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  navigate = (index) => {
    this.setState({ index });
    this.closeDrawer();
  };

  render() {

    let currentComponent = null;
    switch (this.state.index) {
      case 0:
        currentComponent = <VisaoGeral openDrawer={this.openDrawer} />;
        break;
      case 1:
        currentComponent = <Mensagens title="Mensagens" openDrawer={this.openDrawer} />;
        break;
      case 2:
        currentComponent = <Historico title="Histórico" openDrawer={this.openDrawer} />;
        break;
      case 3:
        currentComponent = <CargaExercicios title="Exercícios" openDrawer={this.openDrawer} />;
        break;
      default:
        currentComponent = <VisaoGeral openDrawer={this.openDrawer} />;
        break;
    }

    return (
      <StyleProvider style={educareTheme}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigate={this.navigate} />}
          onClose={this.closeDrawer} >
          {currentComponent}
        </Drawer>
      </StyleProvider>
    );
  }
}