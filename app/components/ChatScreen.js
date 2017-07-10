/* @flow */
import React, { Component } from 'react';
import { TouchableOpacity, Modal, View } from 'react-native';
import {
    Container,
    Header,
    Left,
    Icon,
    Item,
    Title,
    Content,
    Body,
    Text,
    Footer,
    Input,
    Button,
} from 'native-base';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

const TEXTOS = observable([
    {
        tipo: 'me',
        texto: 'Lorem ipsum dolor sit amet',
    },
    {
        tipo: 'other',
        texto: 'Consectetur adipisicing elit. Hic alias, nihil cum, sint itaque, asperiores',
    },
    {
        tipo: 'other',
        texto:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. \nQuae inventore corporis fugiat obcaecati accusamus laborum',
    },
    {
        tipo: 'me',
        texto: 'accusamus labore neque maxime',
    },
    {
        tipo: 'me',
        texto: 'velit, a. Eius ipsum reiciendis, rem.',
    },
]);

@observer
export default class ChatScreen extends Component {
    @observable store = { texto: '' };

    props: {
        store: {
            title: string, // eslint-disable-line
            visible: boolean, // eslint-disable-line
        },
        onClose: () => void,
    };

    static defaultProps = {
        onClose: () => {},
    };

    send = () => {
        TEXTOS.push({ texto: String(this.store.texto), tipo: 'me' });
        this.store.texto = '';
        setTimeout(() => {
            TEXTOS.push({
                texto: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                tipo: 'other',
            });
        }, 1000);
    };

    render() {
        const { store, onClose } = this.props;
        const onChange = (texto) => {
            this.store.texto = texto;
        };
        return (
          <Modal
            animationType={'slide'}
            transparent
            visible={store.visible}
            onRequestClose={onClose}
          >
            <Container>
              <Header appHeader>
                <Left>
                  <TouchableOpacity onPress={onClose}>
                    <Icon name="arrow-back" />
                  </TouchableOpacity>
                </Left>
                <Body>
                  <Title>
                    {store.title}
                  </Title>
                </Body>
              </Header>
              <Content style={{ backgroundColor: '#eaeaea', paddingBottom: 80 }} padder>
                {TEXTOS.map((t, id) =>
                  <MessageItem key={id} texto={t.texto} tipo={t.tipo} />,
                        )}
              </Content>
              <Footer
                style={{
                    backgroundColor: '#fff',
                    height: 'auto',
                    padding: 10,
                    alignItems: 'center',
                }}
              >
                <Item bordered>
                  <Icon active name="message" />
                  <Input
                    value={this.store.texto}
                    multiline
                    onChangeText={onChange}
                    placeholder="Digite sua mensagem..."
                    style={{ flex: 1 }}
                  />
                  <Button style={{ margin: 0, padding: 0 }} onPress={this.send}>
                    {/* <Text>Enviar</Text>*/}
                    <Icon active name="send" />
                  </Button>
                </Item>
              </Footer>
            </Container>
          </Modal>
        );
    }
}

function MessageItem({ texto, tipo }) {
    const tipoStyle = styles[tipo];

    const style = {
        get container() {
            return {
                ...styles.messageContainer,
                ...tipoStyle.container,
            };
        },
        get texto() {
            return {
                ...styles.messageText,
                ...tipoStyle.texto,
            };
        },
    };

    return (
      <View style={style.container}>
        <Text style={style.texto}>
          {texto}
        </Text>
      </View>
    );
}

const styles = {
    messageContainer: {
        marginTop: 15,
    },
    messageText: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    me: {
        container: {
            alignItems: 'flex-end',
            marginLeft: 75,
        },
        texto: {
            backgroundColor: '#26C6DA',
        },
    },
    other: {
        container: {
            alignItems: 'flex-start',
            marginRight: 75,
        },
        texto: {
            backgroundColor: '#fff',
        },
    },
};
