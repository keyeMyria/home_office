import React, { Component } from 'react';
import { Left, Body, Right, Content, Text, Thumbnail, CheckBox, List, ListItem } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

@observer
export default class Faltas extends Component {

  render() {
    return (
      <Content>
        <List>
          {store.alunos.map((aluno, index) => {
            const checked = store.faltas.filter(idAluno => idAluno === aluno.id).length > 0;
            return (
              <ListItem key={index} icon
                onPress={() => checked ? store.removerFaltaAluno(aluno.id) : store.marcarFaltaAluno(aluno.id)}>
                <Left>
                  <Thumbnail small source={require('./img/user.png')} />
                </Left>
                <Body>
                  <Text>{aluno.nome}</Text>
                </Body>
                <Right>
                  <CheckBox
                    checked={checked}
                    style={{ marginRight: 20 }}
                  />
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    );
  }
}