import { Dimensions } from 'react-native';
import {
  DrawerNavigator,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

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
  AbsenseScreen,
  OccurrenceScreen,
  SelectClassScreen,
  OccurrenceReasonScreen,
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

const AbsenseOccurrenceRouter = StackNavigator(
  {
    SelectClassScreen: { screen: SelectClassScreen },
    AbsenseScreen: { screen: AbsenseScreen },
    OccurrenceScreen: { screen: OccurrenceScreen },
    OccurrenceReasonScreen: { screen: OccurrenceReasonScreen },
  },
  {
    headerMode: 'none',
  }
);

export default DrawerNavigator(
  {
    HomeRouter: { screen: HomeRouter },
    MessageScreen: { screen: MessageScreen },
    HistoryScreen: { screen: HistoryScreen },
    AbsenseOccurrenceRouter: { screen: AbsenseOccurrenceRouter },
  },
  {
    headerMode: 'none',
    drawerWidth: Dimensions.get('window').width * 0.85,
    contentComponent: AppNavigator
  }
);
