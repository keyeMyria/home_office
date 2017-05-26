import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Badge, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

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

    console.log(this.props);

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.bubbleMenuView}>
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
        <Content stickyHeaderIndices={[0]}>
          <BubbleMenu />
          {this.state.component}
        </Content>
        <Footer>
          <FooterTab footerTabNavigation>
            {MOCK.visaoGeral.footerMenus.map((item, index) =>
              <Button
                key={index}
                active={index === this.state.index}
                onPress={() => this.switchScreen(index)}
                badge={index === 2}>
                {index === 2 && <Badge><Text>2</Text></Badge>}
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
    borderColor: '#FF5722',
    borderWidth: 3
  },
  bubbleMenuView: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  }
};