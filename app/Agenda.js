import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, List, ListItem, Separator } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { observer } from 'mobx-react/native';
import store from './store';

const AgendaItem = props => {
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
        <Col size={20} style={styles.colunaLinha}>
          <Row><Text style={styles.textoLinha}>{item.diaMes}</Text></Row>
          {/*{item.horario && <Row><Text style={styles.textoLinha}>{item.horario}</Text></Row>}*/}
        </Col>
        <Col size={60} style={styles.colunaLinhaAlignLeft}>
          <Row><Text style={styles.textoLinha}>{item.informacao}</Text></Row>
        </Col>
      </Grid>
    </ListItem>
  );
};

const AgendaSemana = props => {
  return (
    props.items ?
    <View>
      <Separator><Text>{props.label}</Text></Separator>
      {props.items.map((item, index) =>
        <AgendaItem key={index} item={item} />
      )}
    </View>
    :
    <View></View>
  );
};

@observer
export default class Agenda extends Component {
  render() {
    return (
      <List agendaList>
        <AgendaSemana label={store.agendaSemanaAtual.label} items={store.agendaSemanaAtual.items} />
        <AgendaSemana label={store.agendaProximaSemana.label} items={store.agendaProximaSemana.items} />
      </List>
    );
  }
}

const styles = {
  colunaLinha: {
    height: 55,
    alignItems: 'center'
  },
  colunaLinhaAlignLeft: {
    height: 55,
    alignItems: 'flex-start'
  },
  textoLinha: {
    fontSize: 14
  }
};
