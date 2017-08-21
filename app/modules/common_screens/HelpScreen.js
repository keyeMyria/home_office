import React, { Component } from 'react';
import { TouchableWithoutFeedback, Linking, View } from 'react-native';
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
    // Item,
    // Input,
    // Button,
    Text,
} from 'native-base';

const Link = (props) => {
    const onPress = () => Linking.openURL(props.href);
    return (
      <Text style={styles.link} onPress={onPress}>
        {props.children}
      </Text>
    );
};

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
                <Title>Ajuda</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <View style={{ marginBottom: 25 }}>
                <H3>Envie email para:</H3>
                <Link href="mailto:assistencia@educare.digital">
                            assistencia@educare.digital
                        </Link>
              </View>
              <View style={{ marginBottom: 50 }}>
                <H3>Ligue para: </H3>
                <Link href="tel:0800-006-3050">0800-006-3050</Link>
              </View>
              {/* <Text>Nos envie mensagem aqui na plataforma</Text>
              <Item style={styles.item}>
                <Input placeholder="Digite aqui..." multiline style={styles.input} />
              </Item>
              <Button primary style={styles.button}>
                <Text>Enviar mensagem</Text>
              </Button> */}
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
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
};
