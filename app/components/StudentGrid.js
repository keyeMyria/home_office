// @flow
import React, { Component } from 'react';
import { Image } from 'react-native';
import { ListItem, Grid, Row, Col, Text,
         CheckBox, View, Input } from 'native-base';

import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import Aluno from '../models/Aluno';
import Evento from '../models/Evento';

@observer
export default class StudentGrid extends Component {

    props: {
        aluno: Aluno,
        evento: Evento,
        taskType: String,
        onPress: any
    };

    @observable _isChecked = false;

    render() {
        const { aluno, evento, onPress, taskType } = this.props;
        const checkBoxProps = {
            checked: this._isChecked,
            style: { marginRight: 20 },
            onPress: () => {
                this._isChecked = !this._isChecked;
                onPress(this._isChecked, aluno.id);
            },
        };

        const isProva = taskType === 'PROVA';

        return (
          <ListItem>
            <Grid>
              <Col style={styles.coluna(30)}>
                <Row>
                  <Image style={{ width: 30, height: 50 }} source={{ uri: aluno.imagem }} />
                </Row>
              </Col>
              <Col style={styles.coluna(100)}>
                <Row>
                  <Text style={{ ...styles.gridRowText, fontSize: 16 }}>
                    {aluno.nome}
                  </Text>
                </Row>
              </Col>
              <Col style={styles.coluna(30)}>
                <Row>
                  <Text style={{ ...styles.gridRowText, fontSize: 16 }}>
                    {evento.turma.titulo}
                  </Text>
                </Row>
              </Col>
              <Col style={styles.coluna(100)}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {evento.turma.ano.titulo}
                  </Text>
                </Row>
              </Col>
              <Col style={styles.coluna(100)}>
                <Row style={{ alignItems: 'center' }}>
                  <View >
                    { !isProva && <CheckBox {...checkBoxProps} />}
                    { isProva && <Input placeholder="Nota" />}
                  </View>
                </Row>
              </Col>
            </Grid>
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
};
