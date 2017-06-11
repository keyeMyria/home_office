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
  ExerciseConfigurationScreen,
  SelectQuestionScreen,
} from './screens';

const ExerciceRouter = StackNavigator(
  {
    ExerciseScreen: { screen: ExerciseScreen },
    ExerciseConfigurationScreen: { screen: ExerciseConfigurationScreen },
    SelectQuestionScreen: { screen: SelectQuestionScreen },
    SetDateForClassScreen: { screen: SetDateForClassScreen },
  },
  {
    headerMode: 'none',
  }
);

const ExamRouter = StackNavigator(
  {
    ExamScreen: { screen: ExamScreen },
    SetDateForClassScreen: { screen: SetDateForClassScreen },
  },
  {
    headerMode: 'none',
  }
);

const HomeworkRouter = StackNavigator(
  {
    HomeworkScreen: { screen: HomeworkScreen },
    SetDateForClassScreen: { screen: SetDateForClassScreen },
  },
  {
    headerMode: 'none',
  }
);

const HomeRouter = TabNavigator(
  {
    ExerciceRouter: { screen: ExerciceRouter },
    ExamRouter: { screen: ExamRouter },
    AlertScreen: { screen: AlertScreen },
    HomeworkRouter: { screen: HomeworkRouter },
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
  },
  {
    headerMode: 'none',
    drawerWidth: Dimensions.get('window').width * 0.85,
    contentComponent: AppNavigator
  }
);
