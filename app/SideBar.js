import React, { Component } from 'react';
import { Container, Content, Left, Body, Thumbnail, Text, ListItem, List, Separator, Icon } from 'native-base';

import MOCK from './mock/data';

export default class SideBar extends Component {

  navigate = (component) => {
    if (component) {
      this.props.navigate(component);
    }
  }

  render() {
    return (
      <Container sideBarContainer>
        <ListItem>
          <Left>
            <Thumbnail source={require('./img/user.png')} />
          </Left>
          <Body>
            <Text>{MOCK.user.name}</Text>
            <Text profileInfo>{MOCK.user.email}</Text>
          </Body>
        </ListItem>
        <Content>
          <List sideBarMenuList>
            {MOCK.menus.map((menu) =>
              menu.items.map((item, index) =>
                index === 0 ?
                  <Separator><Text>{item.label}</Text></Separator> :
                  <ListItem onPress={() => this.props.navigate(item.index)}>
                    {item.iconName && <Icon name={item.iconName} />}
                    <Text>{item.label}</Text>
                  </ListItem>
              )
            )}
          </List>
        </Content>
      </Container>
    );
  }
}