import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
    AlertScreen,
    CalendarScreen,
    // ExerciseScreen,
    ScoreScreen,
    MessageScreen,
    FeedBackScreen,
    HelpScreen,
} from './screens';

const HomeRouter = TabNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        ScoreScreen: { screen: ScoreScreen },
        AlertScreen: { screen: AlertScreen },
        // ExerciseScreen: { screen: ExerciseScreen },
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
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
