// @flow
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
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
        const { navigation: { dispatch } } = this.props;
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SplashScreen' })],
        });
        userStore.logout();
        dispatch(resetAction);
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
                  {userStore.nome}
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
