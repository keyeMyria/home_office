import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body, Text, Item, Label, Button } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

import BubbleMenu from '../../../components/BubbleMenu';

@observer
export default class ExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { subjectAreaIds: [] };
  }

  toogleSelectSubjectArea = (id) => {

    let newSubjectAreaIds = this.state.subjectAreaIds;

    if (this.subjectAreaIsSelected(id)) {
      newSubjectAreaIds = newSubjectAreaIds.filter(subjectId => subjectId !== id);
    } else {
      newSubjectAreaIds.push(id);
    }

    this.setState({ subjectAreaIds: newSubjectAreaIds });
  }

  subjectAreaIsSelected = id => this.state.subjectAreaIds.filter(subjectId => subjectId === id).length > 0;

  render() {

    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header appHeader>
          <Left>
            <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
          </Left>
          <Body>
            <Title>Exercícios</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <BubbleMenu />
          <Content padder>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Disciplinas a Executar Simulados</Label>
            </Item>
            <View style={styles.buttonView}>
              {store.subjectAreas.map((subject, index) =>
                <Button key={index} rounded
                  onPress={() => this.toogleSelectSubjectArea(subject.id)}
                  style={this.subjectAreaIsSelected(subject.id) ? styles.buttonActive : styles.buttonInactive}>
                  <Text>{subject.name}</Text>
                </Button>
              )}
            </View>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>{'Você tem ' + this.state.subjectAreaIds.length + ' disciplina(s) selecionada(s)!'}</Label>
            </Item>
            <Item stackedLabel style={{ borderBottomWidth: 0, marginBottom: 10 }}>
              <Label>Horários para realização das listas</Label>
            </Item>
          </Content>
        </Content>
      </Container>
    );
  }
}