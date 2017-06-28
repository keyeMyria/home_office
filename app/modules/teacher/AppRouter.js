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
    CalendarScreen,
    FeedBackScreen,
    HelpScreen,
} from './screens';

const HomeRouter = TabNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        ExerciseScreen: { screen: ExerciseScreen },
        AlertScreen: { screen: AlertScreen },
        ExamScreen: { screen: ExamScreen },
        HomeworkScreen: { screen: HomeworkScreen },
    },
    {
        tabBarComponent: HomeNavigator,
        tabBarPosition: 'bottom',
    },
);

export default DrawerNavigator(
    {
        HomeRouter: { screen: HomeRouter },
        MessageScreen: { screen: MessageScreen },
        HistoryScreen: { screen: HistoryScreen },
        AnalysisScreen: { screen: AnalysisScreen },
        SelectClassScreen: { screen: SelectClassScreen },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
