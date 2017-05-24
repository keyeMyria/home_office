import React, { Component } from 'react';
import { Text, List, ListItem, Separator } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import MOCK from './mock/data';

const AgendaItem = (props) => {
  const item = props.item;
  return (
    <ListItem>
      <Grid>
        <Col size={10} style={[styles.colunaLinha, { backgroundColor: item.corTipo }]}>
          <Row><Text style={styles.textoLinha}>{item.tipo}</Text></Row>
        </Col>
        <Col size={10} style={styles.colunaLinha}>
          <Row><Text style={styles.textoLinha}>{item.diaSemana}</Text></Row>
        </Col>
        <Col size={15} style={styles.colunaLinha}>
          <Row><Text style={styles.textoLinha}>{item.diaMes}</Text></Row>
        </Col>
        <Col size={65} style={styles.colunaLinha}>
          <Row><Text style={styles.textoLinha}>{item.informacao}</Text></Row>
        </Col>
      </Grid>
    </ListItem>
  );
};

export default class Agenda extends Component {
  render() {
    return (
      <List agendaList>
        <Separator>
          <Text>{MOCK.agendaSemanaAtual.label}</Text>
        </Separator>
        {MOCK.agendaSemanaAtual.items.map((item, index) =>
          <AgendaItem key={index} item={item} />
        )}
        <Separator>
          <Text>{MOCK.agendaProximaSemana.label}</Text>
        </Separator>
        {MOCK.agendaProximaSemana.items.map((item, index) =>
          <AgendaItem key={index} item={item} />
        )}
      </List>
    );
  }
}

const styles = {
  colunaLinha: {
    height: 50,
    alignItems: 'center'
  },
  textoLinha: {
    fontSize: 12
  }
};
