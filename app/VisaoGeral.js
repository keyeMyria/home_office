import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

import MOCK from './mock/data';

const BubbleMenuItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.bubbleMenuItemView}>
        <Thumbnail
          source={require('./img/user.png')}
          style={props.ativo ? styles.bubbleMenuItemThumbnailAtivo : {}} />
        <Text style={styles.bubbleMenuItemText}>{props.nome}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

class BubbleMenu extends Component {

  constructor(props) {
    super(props);
    this.state = MOCK.filhos[0];
  }

  switchFilho = (index) => {
    this.setState(MOCK.filhos[index]);
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {MOCK.filhos.map((item, index) =>
          <BubbleMenuItem
            key={index}
            nome={item.nome}
            ativo={index === this.state.index}
            onPress={() => this.switchFilho(index)}
          />
        )}
      </ScrollView>
    );
  }
}

export default class VisaoGeral extends Component {

  constructor(props) {
    super(props);
    this.state = MOCK.visaoGeral.routes[0];
  }

  switchScreen = (index) => {
    this.setState(MOCK.visaoGeral.routes[index]);
  }

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <Button onPress={this.props.openDrawer}>
              <Icon name='bars' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <BubbleMenu />
          {this.state.component}
        </Content>
        <Footer>
          <FooterTab footerTabNavigation>
            {MOCK.visaoGeral.footerMenus.map((item, index) =>
              <Button
                key={index}
                active={index === this.state.index}
                onPress={() => this.switchScreen(index)}>
                <Icon name={item.icon} />
                <Text>{item.text}</Text>
              </Button>
            )}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  bubbleMenuItemView: {
    margin: 5,
    alignItems: 'center'
  },
  bubbleMenuItemText: {
    fontSize: 10
  },
  bubbleMenuItemThumbnailAtivo: {
    borderColor: '#388E3C',
    borderWidth: 3
  }
};