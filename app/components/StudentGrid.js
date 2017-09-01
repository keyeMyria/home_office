// @flow
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Text, CheckBox, Input, Thumbnail, View } from 'native-base';

import { observer } from 'mobx-react/native';

import type Aluno from '../models/Aluno';
import type Evento from '../models/Evento';
import type Nota from '../models/Nota';

@observer
export default class tStudentGrid extends Component {
    props: {
        aluno: Aluno,
        evento: Evento,
        taskType: string,
        nota: Nota,
    };

    renderInput() {
        const { taskType, nota } = this.props;
        const needsInput = ['PROVA', 'TRABALHO'].includes(taskType);
        const value = nota.pontuacao || nota.pontuacao === 0 ? String(nota.pontuacao) : '';
        if (needsInput) {
            return (
              <Input
                placeholder="Nota"
                style={styles.input()}
                onChangeText={(val) => {
                    const cleanValue = val.trim().replace(',', '.');
                    if (cleanValue.trim() !== '') nota.pontuacao = cleanValue;
                    else nota.pontuacao = null;
                }}
                keyboardType="numeric"
                value={value}
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
          <ListItem
            avatar
            style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                height: 70,
            }}
          >
            <Left>
              <Thumbnail small source={aluno.imageSource} />
            </Left>
            <Body style={{
                flex: 4,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
            }}
            >
              <View style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
              }}
              >
                <Text type="number">
                  {`${aluno.nome} (${evento.turma.ano.abreviacao} - ${evento.turma.titulo})`}
                </Text>
              </View>
            </Body>
            <Right style={{
                flex: 2,
            }}
            >
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
            width: 80,
            padding: 5,
            marginLeft: 10,
            ...this.gridRowText,
        };
    },
};
