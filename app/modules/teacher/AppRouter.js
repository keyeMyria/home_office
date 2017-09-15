import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
    FaltasScreen,
    HomeworkScreen,
    ComunicadosScreen,
    OcorrenciasScreen,
    LancarNotasScreen,
    SetDateForTarefa,
    ProvasScreen,
    ExerciciosScreen,
} from './screens';

import { AlertScreen, CalendarScreen, FeedBackScreen, HelpScreen } from './../common_screens';

const EventosRouter = StackNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        HomeworkScreen: { screen: HomeworkScreen },
        ProvasScreen: { screen: ProvasScreen },
        ExerciciosScreen: { screen: ExerciciosScreen },
        LancarNotasScreen: { screen: LancarNotasScreen },
        SetDateForTarefa: { screen: SetDateForTarefa },
    },
    {
        headerMode: 'none',
    },
);

const HomeRouter = TabNavigator(
    {
        EventosRouter: { screen: EventosRouter },
        // ExerciseScreen: { screen: ExerciseScreen },
        AlertScreen: { screen: AlertScreen },
        // ExamScreen: { screen: ExamScreen },
    },
    {
        tabBarComponent: HomeNavigator,
        tabBarPosition: 'bottom',
    },
);

export default DrawerNavigator(
    {
        HomeRouter: { screen: HomeRouter },
        ComunicadosScreen: { screen: ComunicadosScreen },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
        FaltasScreen: { screen: FaltasScreen },
        OcorrenciasScreen: { screen: OcorrenciasScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
