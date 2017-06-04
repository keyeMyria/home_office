import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Badge, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

import { styles } from './themes/educareTheme';

const BubbleMenuItem = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.bubbleMenuItemView}>
        <Thumbnail
          source={require('./img/user.png')}
          style={props.ativo ? styles.bubbleMenuItemAtivo : styles.bubbleMenuItemInativo} />
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
            <TouchableWithoutFeedback onPress={() => store.openDrawer()}>
              <Icon name='menu' />
            </TouchableWithoutFeedback>
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
            {store.filhoVisaoGeralMenus.items.map((menu, index) =>
              <Button
                key={index}
                activeOpacity={1}
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