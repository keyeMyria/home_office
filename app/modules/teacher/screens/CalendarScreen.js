import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Modal, Dimensions, StyleSheet } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Icon,
    List,
    ListItem,
    Separator,
    Body,
    Text,
    Button,
    H3,
    Label,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import BubbleMenu from '../../../components/BubbleMenu';

const CalendarItem = (props) => {
    const { item, onPress } = props;
    return (
      <ListItem onPress={() => onPress(item)}>
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

const CalendarWeek = (props) => {
    const { items, onPress } = props;

    return (
      <View>
        {items.length > 0 && <Separator><Text>{props.label}</Text></Separator>}
        {items.map((item, index) => <CalendarItem key={index} item={item} onPress={onPress} />)}
      </View>
    );
};

@observer
export default class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalItem: null,
        };
        this.onPress = this.onPress.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    /**
     * Exibe o modal e coloca o conteudo no estado do component
     * @param {Object} item
     */
    onPress(item) {
        if (!item) return;
        this.setState({ modalItem: item, showModal: true });
    }

    /**
     * Esconde o modal
     */
    hideModal() {
        this.setState({ modalItem: null, showModal: false });
    }

    /**
     * Rendeiza o componente do modal
     */
    renderModal() {
        const item = this.state.modalItem;
        if (!item) return false;

        return (
          <Modal
            animationType="fade"
            transparent
            visible={this.state.showModal}
            onRequestClose={this.hideModal}
          >
            <View style={localStyles.modalBackdrop}>
              <View style={localStyles.modalContainer}>
                <View style={localStyles.modalHeader}>
                  <H3>{item.title}</H3>
                </View>
                <View style={localStyles.modalContent}>
                  {item.turma &&
                  <View style={localStyles.modalItens}>
                    <Label>Turma: </Label><Text>{item.turma}</Text>
                  </View>}
                  {item.grade &&
                  <View style={localStyles.modalItens}>
                    <Label>Nota: </Label><Text>{item.grade} Pontos</Text>
                  </View>}
                </View>
                <View style={localStyles.modalFooter}>
                  <Button onPress={this.hideModal} style={{ alignSelf: 'auto' }}>
                    <Text>OK</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        const currentWeekItems = store.teacherCalendar.currentWeekItems;
        const lastWeekItems = store.teacherCalendar.lastWeekItems;

        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </TouchableWithoutFeedback>
              </Left>
              <Body>
                <Title>Agenda</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              {this.renderModal()}
              <BubbleMenu mode="schoolYear" />
              <List agendaList>
                <CalendarWeek
                  label="Semana Atual"
                  items={currentWeekItems}
                  onPress={this.onPress}
                />
                <CalendarWeek
                  label="Última Semana"
                  items={lastWeekItems}
                  onPress={this.onPress}
                />
              </List>
            </Content>
          </Container>
        );
    }
}

const localStyles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        padding: 20,
        minHeight: 200,
        backgroundColor: 'white',
        width: Dimensions.get('window').width - 80,
    },
    modalHeader: {
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 10,
        // borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    modalHeaderTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        flex: 1,
    },
    modalFooter: {
        paddingTop: 10,
        marginTop: 10,
        // borderTopWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'flex-end',
    },
    modalItens: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
