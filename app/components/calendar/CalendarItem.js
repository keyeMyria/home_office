// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Grid, Row, Col, Text } from 'native-base';
import { observer } from 'mobx-react/native';

import rootStore from './../../stores';

import type { Evento } from '../../models';

@observer
export default class CalendarItem extends Component {
    props: {
        item: Evento,
        onPress: Evento => void,
    };

    static defaultProps = {
        // $FlowFixMe
        onPress: () => {},
    };

    render() {
        const { item, onPress } = this.props;

        const infoText = rootStore.user.isProfessor
            ? `${item.turmaAno} - ${item.infoText}`
            : item.infoText;

        return (
          <ListItem onPress={() => onPress(item)}>
            <Grid style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'stretch',
            }}
            >
              <Col style={styles.tipoAbbrCol(item.tarefa.color)}>
                <Row>
                  <Text style={styles.gridRowText}>{item.tarefa.abbr}</Text>
                </Row>
              </Col>
              <Col style={styles.diaSemana}>
                <Row>
                  <Text style={{ ...styles.gridRowText, fontSize: 16 }}>
                    {item.dayOfWeek}
                  </Text>
                </Row>
              </Col>
              <Col style={styles.dataHora}>
                <Row>
                  <Text style={styles.gridRowText}>{item.fim.format('(DD/MMM)')}</Text>
                </Row>
              </Col>
              <Col size={100} style={styles.infoText}>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.gridRowText}>{infoText}</Text>
                </View>
              </Col>
            </Grid>
          </ListItem>
        );
    }
}

// Styles
const styles = {
    gridColumn: {
        alignItems: 'center',
    },
    gridColumnAlignLeft: {
        alignItems: 'flex-start',
    },
    gridRowText: {
        fontSize: 14,
    },
    tipoAbbrCol: function tipoAbbrCol(cor: string) {
        return {
            ...this.gridColumn,
            backgroundColor: cor,
            width: 30,
        };
    },
    get diaSemana(): Object {
        return {
            ...this.gridColumn,
            width: 30,
        };
    },
    infoText: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    get dataHora() {
        return {
            ...this.gridColumn,
            width: 60,
        };
    },
};
