import React, { Component } from 'react';
import { Footer, FooterTab, Button, Badge, Icon, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../store';

@observer
export default class HomeTabNavigator extends Component {
    render() {
        const { navigate, state: { index } } = this.props.navigation;
        const alertBadgeCount =
            store.studentSelected.alerts != null
                ? store.studentSelected.alerts.items.filter(o => !o.readed).length
                : 0;

        return (
          <Footer>
            <FooterTab footerTabNavigation>
              <Button active={index === 0} onPress={() => navigate('CalendarScreen')}>
                <Icon name="event-note" />
                <Text>Agenda</Text>
              </Button>
              <Button active={index === 1} onPress={() => navigate('ScoreScreen')}>
                <Icon name="filter-9-plus" />
                <Text>Notas</Text>
              </Button>
              <Button
                active={index === 2}
                onPress={() => navigate('AlertScreen')}
                badge={alertBadgeCount > 0}
              >
                {alertBadgeCount > 0 &&
                <Badge>
                  <Text>
                    {alertBadgeCount}
                  </Text>
                </Badge>}
                <Icon name="notifications" />
                <Text>Alertas</Text>
              </Button>
              <Button active={index === 3} onPress={() => navigate('ExerciseScreen')}>
                <Icon name="library-books" />
                <Text>Simulados</Text>
              </Button>
              <Button active={index === 4} onPress={() => navigate('PlanningScreen')}>
                <Icon name="tune" />
                <Text>Planejar</Text>
              </Button>
            </FooterTab>
          </Footer>
        );
    }
}
