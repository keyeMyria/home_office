// @flow
import React, { Component } from 'react';
import { ListItem, Grid, Row, Col, Text } from 'native-base';
import { PropTypes } from 'mobx-react';

import type CalendarItemModel from '../../store/models/CalendarItem';

const emptyFunction = () => {};

export default class CalendarItem extends Component {
    props: {
        item: CalendarItemModel,
        onPress: CalendarItemModel => void,
        type: 'student' | 'teacher' | 'parent',
    };

    static propTypes = {
        item: PropTypes.objectOrObservableObject,
        onPress: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['student', 'teacher', 'parent']),
    };

    static defaultProps = {
        onPress: emptyFunction,
    };

    renderTipoAbbr(item: CalendarItemModel) {
        return (
          <Col size={10} style={[styles.gridColumn, { backgroundColor: item.colorType }]}>
            <Row>
              <Text style={styles.gridRowText}>
                {item.tipoAbreviado}
              </Text>
            </Row>
          </Col>
        );
    }

    renderDiaSemana(item: CalendarItemModel) {
        return (
          <Col size={10} style={[styles.gridColumn]}>
            <Row>
              <Text style={styles.gridRowText}>
                {item.diaSemanaNumero}
              </Text>
            </Row>
          </Col>
        );
    }

    renderDataHora(item: CalendarItemModel) {
        return (
          <Col size={20} style={[styles.gridColumn, { backgroundColor: item.colorType }]}>
            <Row>
              <Text style={styles.gridRowText}>
                {item.dataAbbr}
              </Text>
              {item.horaFim &&
                <Text style={styles.gridRowText}>
                  {item.horaFim}
                </Text>}
            </Row>
          </Col>
        );
    }

    getInfoText(item: CalendarItemModel) {
        const { type } = this.props;
        let anoAndTurma = '';
        if (type !== 'student' || type !== 'parent') {
            anoAndTurma = `${item.ano} ${item.turmas.join(', ')}`;
        }
        return {
            linha1: `${anoAndTurma}${item.tipoAndDisciplina}`,
        };
    }

    renderInformation(item: CalendarItemModel) {
        const { linha1, linha2 } = this.getInfoText(item);

        return (
          <Col size={60} style={styles.gridColumnAlignLeft}>
            <Row>
              <Text style={styles.gridRowText}>
                {item.information}
              </Text>
            </Row>
          </Col>
        );
    }

    render() {
        const { item, onPress, type } = this.props;
        return (
          <ListItem onPress={() => onPress(item)}>
            <Grid>
              <Col size={10} style={[styles.gridColumn, { backgroundColor: item.cor }]}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.tipoAbreviado}
                  </Text>
                </Row>
              </Col>
              <Col size={30} style={styles.gridColumn}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.diaSemanaNumero} {item.date}
                  </Text>
                </Row>
              </Col>
              <Col size={60} style={styles.gridColumnAlignLeft}>
                <Row>
                  <Text style={styles.gridRowText}>
                    {item.information}
                  </Text>
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
    },
};
