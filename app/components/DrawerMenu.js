// @flow
import React, { Component } from 'react';
import { Container, Content, Left, Body, Thumbnail, Text, ListItem, List, Icon } from 'native-base';
import { observer } from 'mobx-react/native';

// User Store
import userStore from './../stores/UserStore';

type DrawerMenuItemType = {
    title: string,
    route: string,
    icon: string,
};

@observer
export default class DrawerMenu extends Component {
    props: {
        navigation: any,
        items: Array<DrawerMenuItemType>,
    };

    logout = () => {
        userStore.logout();
    };

    renderItems(item: DrawerMenuItemType, index: number) {
        const { navigation: { navigate } } = this.props;
        return (
          <ListItem key={index} onPress={() => navigate(item.route)}>
            <Icon name={item.icon} />
            <Text>
              {item.title}
            </Text>
          </ListItem>
        );
    }

    render() {
        const { items } = this.props;

        return (
          <Container sideBarContainer>
            <ListItem>
              <Left>
                <Thumbnail source={userStore.avatar} />
              </Left>
              <Body>
                <Text>
                  {userStore.nomeCompleto}
                </Text>
                <Text profileInfo>
                  {userStore.email}
                </Text>
              </Body>
            </ListItem>
            <Content>
              <List sideBarMenuList>
                {items.map(this.renderItems, this)}
                <ListItem onPress={this.logout}>
                  <Icon name="launch" />
                  <Text>Sair</Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
    }
}
