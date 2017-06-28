import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Icon,
    Body,
    H3,
    Item,
    Input,
    Button,
    Text,
} from 'native-base';

export default class AnalysisScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </TouchableWithoutFeedback>
              </Left>
              <Body>
                <Title>Feedback</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <H3>Reporte um erro, envie uma sugestão, elogio, o que quiser!:</H3>
              <Item style={styles.item}>
                <Input placeholder="Digite aqui..." multiline style={styles.input} />
              </Item>
              <Button primary style={styles.button}>
                <Text>Enviar Feedback</Text>
              </Button>
            </Content>
          </Container>
        );
    }
}

const styles = {
    item: {
        marginTop: 5,
        borderBottomWidth: 0,
    },
    itemLabel: {
        borderBottomWidth: 0,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 2,
        height: 150,
        marginVertical: 20,
    },
    button: {
        alignSelf: 'flex-end',
    },
};
