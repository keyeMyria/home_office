import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
  AlertScreen,
  CalendarScreen,
  ExerciseScreen,
  PlanningScreen,
  ScoreScreen,
  MessageScreen,
  HistoryScreen,
} from './screens';

const HomeRouter = TabNavigator(
  {
    CalendarScreen: { screen: CalendarScreen },
    ScoreScreen: { screen: ScoreScreen },
    AlertScreen: { screen: AlertScreen },
    ExerciseScreen: { screen: ExerciseScreen },
    PlanningScreen: { screen: PlanningScreen },
  },
  {
    tabBarComponent: HomeNavigator,
    tabBarPosition: 'bottom',
  }
);

export default DrawerNavigator(
  {
    HomeRouter: { screen: HomeRouter },
    MessageScreen: { screen: MessageScreen },
    HistoryScreen: { screen: HistoryScreen },
  },
  {
    headerMode: 'none',
    drawerWidth: Dimensions.get('window').width * 0.85,
    contentComponent: AppNavigator
  }
);
