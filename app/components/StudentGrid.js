// @flow
/* eslint no-return-assign: 0 */
import React, { Component } from 'react';
import { ListItem, Text, CheckBox, Input, Thumbnail, View } from 'native-base';

import { observer } from 'mobx-react/native';

import type Aluno from '../models/Aluno';
import type Nota from '../models/Nota';

@observer
export default class tStudentGrid extends Component {
    props: {
        aluno: Aluno,
        evento: any,
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
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: 70,
                padding: 5,
                paddingRight: 15,
                paddingLeft: 5,
                borderBottomColor: '#ccc',
                borderBottomWidth: 0.5,
                marginRight: 25,
            }}
          >
            <Thumbnail small source={aluno.imageSource} />
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: 20,
            }}
            >
              <Text type="number">
                {`${aluno.nomeCompleto} (${evento.turma_e_ano})`}
              </Text>
            </View>
            {this.renderInput()}
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
            alignSelf: 'flex-end',
            borderWidth: 1,
            borderColor: '#E0E0E0',
            borderRadius: 2,
            marginTop: 0,
            maxWidth: 80,
            padding: 5,
            marginLeft: 10,
            ...this.gridRowText,
        };
    },
};
