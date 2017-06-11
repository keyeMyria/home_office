import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
  AlertScreen,
  ExerciseScreen,
  MessageScreen,
  HistoryScreen,
  AbsenseScreen,
  OccurrenceScreen,
  SelectClassScreen,
  OccurrenceReasonScreen,
  ExamScreen,
  HomeworkScreen,
  AnalysisScreen,
  SetDateForClassScreen,
} from './screens';

const HomeRouter = TabNavigator(
  {
    ExerciseScreen: { screen: ExerciseScreen },
    ExamScreen: { screen: ExamScreen },
    AlertScreen: { screen: AlertScreen },
    HomeworkScreen: { screen: HomeworkScreen },
    AnalysisScreen: { screen: AnalysisScreen },
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
    SetDateForClassScreen: { screen: SetDateForClassScreen },
  },
  {
    headerMode: 'none',
    drawerWidth: Dimensions.get('window').width * 0.85,
    contentComponent: AppNavigator
  }
);
