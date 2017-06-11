import React, { Component } from 'react';
import { Footer, FooterTab, Button, Badge, Icon, Text } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../store';

@observer
export default class HomeTabNavigator extends Component {

  render() {

    const { navigate, state: { index } } = this.props.navigation;
    const alertBadgeCount = store.teacher.alerts != null ? store.teacher.alerts.items.filter(o => !o.readed).length : 0;

    return (
      <Footer>
        <FooterTab footerTabNavigation>
          <Button
            active={index === 0}
            onPress={() => navigate('ExerciseScreen')}>
            <Icon name="tune" />
            <Text>Exercícios</Text>
          </Button>
          <Button
            active={index === 1}
            onPress={() => navigate('ExamScreen')}>
            <Icon name="assignment-turned-in" />
            <Text>Provas</Text>
          </Button>
          <Button
            active={index === 2}
            onPress={() => navigate('AlertScreen')}
            badge={alertBadgeCount > 0}>
            {alertBadgeCount > 0 && <Badge><Text>{alertBadgeCount}</Text></Badge>}
            <Icon name="notifications" />
            <Text>Alertas</Text>
          </Button>
          <Button
            active={index === 3}
            onPress={() => navigate('HomeworkScreen')}>
            <Icon name="library-books" />
            <Text>Trabalhos</Text>
          </Button>
          <Button
            active={index === 4}
            onPress={() => navigate('AnalysisScreen')}>
            <Icon name="insert-chart" />
            <Text>Análises</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}