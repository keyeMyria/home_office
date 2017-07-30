import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
    // ExerciseScreen,
    // SelectClassScreen,
    // ExamScreen,
    // HomeworkScreen,
    // ComunicadosScreen,
    LancarNotasScreen,
} from './screens';

import { AlertScreen, CalendarScreen, FeedBackScreen, HelpScreen } from './../common_screens';

const HomeRouter = TabNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        // ExerciseScreen: { screen: ExerciseScreen },
        AlertScreen: { screen: AlertScreen },
        // ExamScreen: { screen: ExamScreen },
        // HomeworkScreen: { screen: HomeworkScreen },
    },
    {
        tabBarComponent: HomeNavigator,
        tabBarPosition: 'bottom',
    },
);

export default DrawerNavigator(
    {
        HomeRouter: { screen: HomeRouter },
        // ComunicadosScreen: { screen: ComunicadosScreen },
        // SelectClassScreen: { screen: SelectClassScreen },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
        LancarNotasScreen: { screen: LancarNotasScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
