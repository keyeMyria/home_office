// @flow
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Text, CheckBox, Input, Thumbnail } from 'native-base';

import { observer } from 'mobx-react/native';

import type Aluno from '../models/Aluno';
import type Evento from '../models/Evento';
import type Nota from '../models/Nota';

@observer
export default class StudentGrid extends Component {
    props: {
        aluno: Aluno,
        evento: Evento,
        taskType: string,
        nota: Nota,
    };

    renderInput() {
        const { taskType, nota } = this.props;
        const isProva = taskType === 'PROVA';
        if (isProva) {
            return (
              <Input
                placeholder="Nota"
                style={styles.input()}
                onChangeText={val => (nota.pontuacao = Number(val))}
                keyboardType="numeric"
              />
            );
        }

        return (
          <CheckBox
            checked={nota.naoEntregue}
            style={{ marginRight: 20 }}
            onPress={() => (nota.naoEntregue = !nota.naoEntregue)}
          />
        );
    }

    render() {
        const { aluno, evento } = this.props;

        return (
          <ListItem avatar>
            <Left>
              <Thumbnail small source={aluno.imageSource} />
            </Left>
            <Body>
              <Text>
                {`${aluno.nome} (${evento.turma.ano.abreviacao} - ${evento.turma.titulo})`}
              </Text>
            </Body>
            <Right>
              {this.renderInput()}
            </Right>
          </ListItem>
        );
    }
}

// Styles
const styles = {
    gridColumn: {
        height: 55,
        alignItems: 'center',
    },
    gridColumnAlignLeft: {
        height: 55,
        alignItems: 'flex-start',
    },
    gridRowText: {
        fontSize: 14,
        alignItems: 'flex-start',
    },
    infoText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    coluna: function coluna(width: number) {
        return {
            ...this.gridColumn,
            width,
        };
    },
    input: function input() {
        return {
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 2,
            marginTop: 0,
            width: 50,
            // height: 30,
            padding: 5,
            ...this.gridRowText,
        };
    },
};
