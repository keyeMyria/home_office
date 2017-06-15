import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
  AlertScreen,
  ExerciseScreen,
  MessageScreen,
  HistoryScreen,
  SelectClassScreen,
  ExamScreen,
  HomeworkScreen,
  AnalysisScreen,
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

export default DrawerNavigator(
  {
    HomeRouter: { screen: HomeRouter },
    MessageScreen: { screen: MessageScreen },
    HistoryScreen: { screen: HistoryScreen },
    SelectClassScreen: { screen: SelectClassScreen },
  },
  {
    headerMode: 'none',
    drawerWidth: Dimensions.get('window').width * 0.85,
    contentComponent: AppNavigator
  }
);
