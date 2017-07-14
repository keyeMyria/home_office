// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Grid, Row, Col, Text } from 'native-base';
import { PropTypes } from 'mobx-react';
// import moment from 'moment';
import _ from 'lodash';

const emptyFunction = () => {};

const TIPOS = {
    EXERCICIO: 'DC',
    PROVA: 'P',
    TRABALHO: 'T',
    LISTA_ONLINE: 'EP',
};

const TIPOS_COR = {
    EXERCICIO: '#64B5F6',
    PROVA: '#E57373',
    TRABALHO: 'gray',
    LISTA_ONLINE: '#FFF176',
};

export default class CalendarItem extends Component {
    props: {
        item: Object,
        onPress: Object => void,
        type: 'student' | 'teacher' | 'parent',
    };

    static propTypes = {
        item: PropTypes.objectOrObservableObject,
        onPress: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        onPress: emptyFunction,
    };

    renderTipoAbbr(item: Object) {
        const style = {
            ...styles.gridColumn,
            backgroundColor: TIPOS_COR[item.tarefa.tipo],
            width: 30,
        };

        return (
          <Col style={style}>
            <Row>
              <Text style={styles.gridRowText}>
                {TIPOS[item.tarefa.tipo]}
              </Text>
            </Row>
          </Col>
        );
    }

    renderDiaSemana(item: Object) {
        const style = {
            ...styles.gridColumn,
            width: 30,
        };
        return (
          <Col style={style}>
            <Row>
              <Text style={{ ...styles.gridRowText, fontSize: 16 }}>
                {getDiaSemana(item.fim)}
              </Text>
            </Row>
          </Col>
        );
    }

    renderDataHora(item: Object) {
        const style = {
            ...styles.gridColumn,
            width: 60,
        };
        return (
          <Col style={style}>
            <Row>
              <Text style={styles.gridRowText}>
                {getDateFormated(item.fim)}
              </Text>
            </Row>
          </Col>
        );
    }

    renderInformation(item: Object) {
        return (
          <Col
            size={60}
            style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}
          >
            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ ...styles.gridRowText, borderWidth: 1 }}>
                {_.capitalize(item.tarefa.tipo.toLowerCase())} - {item.disciplina.titulo}
              </Text>
              <Text style={styles.gridRowText}>
                {item.tarefa.titulo} - {item.tarefa.valor} - {item.tarefa.bimestre}º
                        Bimestre
                    </Text>
            </View>
          </Col>
        );
    }

    render() {
        const { item, onPress } = this.props;
        return (
          <ListItem onPress={() => onPress(item)}>
            <Grid>
              {this.renderTipoAbbr(item)}
              {this.renderDiaSemana(item)}
              {this.renderDataHora(item)}
              {this.renderInformation(item)}
            </Grid>
          </ListItem>
        );
    }
}

function getDiaSemana(date) {
    const _date = new Date(date);
    return `${_date.getDay() + 2}ª`;
}

function getDateFormated(date) {
    const d = new Date(date);
    const meses = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
    ];
    return `(${d.getDate()}/${meses[d.getMonth()]})`;
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
