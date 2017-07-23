import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
    AlertScreen,
    CalendarScreen,
    ScoreScreen,
    FeedBackScreen,
    HelpScreen,
} from './../common_screens';

const HomeRouter = TabNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        ScoreScreen: { screen: ScoreScreen },
        AlertScreen: { screen: AlertScreen },
    },
    {
        tabBarComponent: HomeNavigator,
        tabBarPosition: 'bottom',
    },
);

export default DrawerNavigator(
    {
        HomeRouter: { screen: HomeRouter },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
