// @flow
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

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth > 376 ? 320 : screenWidth - 56;

export default DrawerNavigator(
    {
        HomeRouter: { screen: HomeRouter, headerMode: 'float' },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
    },
    {
        headerMode: 'none',
        drawerWidth,
        contentComponent: AppNavigator,
    },
);
