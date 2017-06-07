import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Icon, Body, Right, Title, Toast, Tabs, Tab, ActionSheet } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

import Faltas from './Faltas';
import Ocorrencias from './Ocorrencias';

@observer
export default class FaltasOcorrencias extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: store.turmas[0],
      turmaActions: store.turmas.concat(['Cancel']),
      cancelIndex: store.turmas.length
    };
  }

  limpar = () => {
    store.removerFaltaTodosAlunos();
  }

  salvar = () => {
    Toast.show({
      text: 'Dados salvos com sucesso!',
      type: 'success',
      position: 'bottom',
      buttonText: 'OK'
    });
  }

  selecionarTurma = () => {
    ActionSheet.show(
      {
        options: this.state.turmaActions,
        cancelButtonIndex: this.state.cancelIndex,
        title: 'Selecionar Turma'
      },
      (buttonIndex) => {
        if (buttonIndex !== this.state.cancelIndex) {
          this.setState({ title: this.state.turmaActions[buttonIndex] });
        }
      }
    );
  }

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => store.openDrawer()}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right>
            <TouchableWithoutFeedback onPress={this.selecionarTurma}>
              <Icon name="group" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.limpar}>
              <Icon name="clear-all" />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.salvar}>
              <Icon name="save" />
            </TouchableWithoutFeedback>
          </Right>
        </Header>
        <Tabs>
          <Tab heading="Faltas">
            <Faltas />
          </Tab>
          <Tab heading="Ocorrências">
            <Ocorrencias />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}