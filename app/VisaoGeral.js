import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Badge, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

const BubbleMenuItem = props => {
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

@observer
class BubbleMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.bubbleMenuView}>
        {store.filhos.map((filho, index) =>
          <BubbleMenuItem
            key={index}
            nome={filho.nome}
            ativo={filho.id === store.filhoSelecionado.id}
            onPress={() => store.selecionarFilho(filho.id)}
          />
        )}
      </ScrollView>
    );
  }
}

@observer
export default class VisaoGeral extends Component {

  constructor(props) {
    super(props);
    store.navigateVisaoGeralPage(0);
  }

  render() {
    return (
      <Container>
        <Header appHeader>
          <Left>
            <Button onPress={() => store.openDrawer()}>
              <Icon name='bars' />
            </Button>
          </Left>
          <Body>
            <Title>{store.currentVisaoGeralPage.props.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content stickyHeaderIndices={[0]}>
          <BubbleMenu />
          {store.currentVisaoGeralPage}
        </Content>
        <Footer>
          <FooterTab footerTabNavigation>
            {store.visaoGeralFooterMenus.map((menu, index) =>
              <Button
                key={index}
                active={index === store.currentVisaoGeralPage.index}
                onPress={() => store.navigateVisaoGeralPage(index)}
                badge={menu.badge && menu.badge > 0}>
                {menu.badge && menu.badge > 0 && <Badge><Text>{menu.badge}</Text></Badge>}
                <Icon name={menu.iconName} />
                <Text>{menu.label}</Text>
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