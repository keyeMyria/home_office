import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

import { observer } from 'mobx-react/native';

@observer
export default class HomeTabNavigator extends Component {
    render() {
        const { navigate, state: { index } } = this.props.navigation;

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
              <Button active={index === 2} onPress={() => navigate('AlertScreen')}>
                <Icon name="notifications" />
                <Text>Avisos</Text>
              </Button>
              {/* <Button active={index === 3} onPress={() => navigate('ExerciseScreen')}>
                <Icon name="library-books" />
                <Text>Simulados</Text>
              </Button>
              <Button active={index === 4} onPress={() => navigate('PlanningScreen')}>
                <Icon name="tune" />
                <Text>Rotina</Text>
              </Button> */}
            </FooterTab>
          </Footer>
        );
    }
}
