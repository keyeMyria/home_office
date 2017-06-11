import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, List, ListItem, Separator, Body, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import BubbleMenu from '../../../components/BubbleMenu';

const CalendarItem = props => {
  const item = props.item;
  return (
    <ListItem>
      <Grid>
        <Col size={10} style={[styles.gridColumn, { backgroundColor: item.colorType }]}>
          <Row><Text style={styles.gridRowText}>{item.type}</Text></Row>
        </Col>
        <Col size={30} style={styles.gridColumn}>
          <Row><Text style={styles.gridRowText}>{item.dayOfWeek} {item.date}</Text></Row>
        </Col>
        <Col size={60} style={styles.gridColumnAlignLeft}>
          <Row><Text style={styles.gridRowText}>{item.information}</Text></Row>
        </Col>
      </Grid>
    </ListItem>
  );
};

const CalendarWeek = props => {
  return (
    props.items ?
      <View>
        {props.items.length > 0 && <Separator><Text>{props.label}</Text></Separator>}
        {props.items.map((item, index) =>
          <CalendarItem key={index} item={item} />
        )}
      </View>
      :
      <View></View>
  );
};

@observer
export default class CalendarScreen extends Component {

  constructor(props) {
    super(props);
    store.selectStudent(1);
  }

  render() {

    const { navigate } = this.props.navigation;
    const currentWeekItems = store.studentSelected.calendar.currentWeekItems;
    const nextWeekItems = store.studentSelected.calendar.nextWeekItems;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Agenda</Title>
          </Body>
          <Right />
        </Header>
        <Content stickyHeaderIndices={[0]}>
          <BubbleMenu />
          <List agendaList>
            <CalendarWeek label="Semana Atual" items={currentWeekItems} />
            <CalendarWeek label="Próxima Semana" items={nextWeekItems} />
          </List>
        </Content>
      </Container>
    );
  }
}