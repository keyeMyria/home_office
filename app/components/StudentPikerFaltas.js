// @flow
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import { ListItem, Left, Body, Right, Thumbnail, Text, CheckBox } from 'native-base';
import { ActivityIndicator, Alert } from 'react-native';

import faltaStore from './../stores/professor/FaltasStore';
import { Aluno, Falta } from './../models';
import logger from './../lib/logger';

@observer
export default class StudentItem extends Component {
    props: {
        aluno: Aluno,
    };

    @observable loading = false;

    onItemPress = () => {
        const aluno = this.props.aluno;
        if (!faltaStore.aula && !faltaStore.avisoTodasAsAulas && !aluno._selected) {
            let message = 'Você esta prestes a lançar uma falta para todas as aulas do dia. \n\n';
            message += 'Tem certeza que deseja fazer isso?';
            Alert.alert('Tem Certeza?', message, [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim',
                    onPress: () => {
                        faltaStore.avisoTodasAsAulas = true;
                        this.saveFalta();
                    },
                },
            ]);
        } else {
            this.saveFalta();
        }
    };

    saveFalta = () => {
        this.loading = true;
        const { aluno } = this.props;
        const alunoId = aluno.pk;
        const data = faltaStore.data.format('YYYY-MM-DD');
        const falta = !aluno._selected;
        const aula = (faltaStore.aula && faltaStore.aula.pk) || undefined;
        const todas = !faltaStore.aula;
        Falta.toggle(alunoId, data, falta, aula, todas)
            .then(() => {
                aluno._selected = !aluno._selected;
                this.loading = false;
            })
            .catch((error) => {
                this.loading = false;
                logger.error(error);
            });
    };

    render() {
        const { aluno } = this.props;
        return (
          <ListItem icon onPress={this.onItemPress}>
            <Left>
              <Thumbnail small source={aluno.imageSource} />
            </Left>
            <Body>
              <Text>{aluno.nomeCompleto}</Text>
            </Body>
            <Right>
              {!this.loading && <CheckBox
                checked={!!aluno._selected}
                style={{ marginRight: 20 }}
                onPress={this.onItemPress}
              />}
              {this.loading && <ActivityIndicator style={{ marginRight: 10 }} />}
            </Right>
          </ListItem>
        );
    }
}
