import React, { Component } from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Badge,
  Icon,
  Text,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../store';

@observer
export default class HomeTabNavigator extends Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  navigate = (activeIndex, screen) => {
    this.props.navigation.navigate(screen);
    this.setState({ activeIndex });
  }

  render() {
    return (
      <Footer>
        <FooterTab footerTabNavigation>
          <Button
            active={this.state.activeIndex === 0}
            onPress={() => this.navigate(0, 'CalendarScreen')}>
            <Icon name="event-note" />
            <Text>Agenda</Text>
          </Button>
          <Button
            active={this.state.activeIndex === 1}
            onPress={() => this.navigate(1, 'ScoreScreen')}>
            <Icon name="filter-9-plus" />
            <Text>Notas</Text>
          </Button>
          <Button
            active={this.state.activeIndex === 2}
            onPress={() => this.navigate(2, 'AlertScreen')}
            badge={store.alertBadgeCount > 0}>
            {store.alertBadgeCount > 0 && <Badge><Text>{store.alertBadgeCount}</Text></Badge>}
            <Icon name="notifications" />
            <Text>Alertas</Text>
          </Button>
          <Button
            active={this.state.activeIndex === 3}
            onPress={() => this.navigate(3, 'ExerciseScreen')}>
            <Icon name="library-books" />
            <Text>Exercícios</Text>
          </Button>
          <Button
            active={this.state.activeIndex === 4}
            onPress={() => this.navigate(4, 'PlanningScreen')}>
            <Icon name="tune" />
            <Text>Planejar</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}