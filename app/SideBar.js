import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Left, Body, Thumbnail, Text, ListItem, List, Separator, Icon } from 'native-base';

import { observer } from 'mobx-react/native';
import store from './store';

@observer
export default class SideBar extends Component {

  render() {
    return (
      <Container sideBarContainer>
        <ListItem>
          <Left>
            <Thumbnail source={require('./img/user.png')} />
          </Left>
          <Body>
            <Text>{store.usuario.name}</Text>
            <Text profileInfo>{store.usuario.email}</Text>
          </Body>
        </ListItem>
        <Content>
          <List sideBarMenuList>
            {store.menu.secoes.map((secao, index) =>
              <View key={index}>
                <Separator><Text>{secao.label}</Text></Separator>
                {secao.items.map((item, index) =>
                  <ListItem key={index} onPress={() => store.navigate(index)}>
                    {item.iconName && <Icon name={item.iconName} />}
                    <Text>{item.label}</Text>
                  </ListItem>
                )}
              </View>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}