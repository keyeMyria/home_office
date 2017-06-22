import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert, Modal } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Icon,
    Body,
    Text,
    Thumbnail,
    CheckBox,
    List,
    ListItem,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

@observer
export default class AbsenseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: props.visible };
        this.save = this.save.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    }

    save(){
        Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
            { text: 'OK', onPress: this.props.hideModal },
        ]);
    }

    checkUncheckStudentAbsense = (checked, studentId) => {
        checked ? store.uncheckStudentAbsense(studentId) : store.checkStudentAbsense(studentId);
    };

    render() {
        return (
          <Modal animationType={'slide'} transparent={false} visible={this.state.visible}>
            <Container>
              <Header appHeader>
                <Left>
                  <TouchableWithoutFeedback onPress={this.props.hideModal}>
                    <Icon name="arrow-back" />
                  </TouchableWithoutFeedback>
                </Left>
                <Body>
                  <Title>Faltas</Title>
                </Body>
                <Right>
                  <TouchableWithoutFeedback onPress={this.save}>
                    <Text>Salvar</Text>
                  </TouchableWithoutFeedback>
                </Right>
              </Header>
              <Content>
                <List>
                  {store.students.map((student, index) => {
                      const checked =
                                    store.absenses.filter(studentId => studentId === student.id)
                                        .length > 0;
                      return (
                        <ListItem
                          key={index}
                          icon
                          onPress={() =>
                                            this.checkUncheckStudentAbsense(checked, student.id)}
                        >
                          <Left>
                            <Thumbnail
                              small
                              source={store.getStudentImagebyId(student.id)}
                            />
                          </Left>
                          <Body>
                            <Text>{student.name}</Text>
                          </Body>
                          <Right>
                            <CheckBox
                              checked={checked}
                              style={{ marginRight: 20 }}
                            />
                          </Right>
                        </ListItem>
                      );
                  })}
                </List>
              </Content>
            </Container>
          </Modal>
        );
    }
}
