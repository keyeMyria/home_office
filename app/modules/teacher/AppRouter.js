import { Dimensions } from 'react-native';
import { DrawerNavigator, TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';

// Components
import AppNavigator from './AppNavigator';
import HomeNavigator from './HomeNavigator';
import {
    FaltasScreen,
    ComunicadosScreen,
    ListOcorrenciaScreen,
    NovaOcorrenciasScreen,
    EditarOcorrenciasScreen,
    LancarNotasScreen,
    SetDateForTarefa,
    TarefasScreen,
} from './screens';

import { AlertScreen, CalendarScreen, FeedBackScreen, HelpScreen } from './../common_screens';

const navigateOnce = getStateForAction => (action, state) => {
    const { type, routeName } = action;
    return state &&
        type === NavigationActions.NAVIGATE &&
        routeName === state.routes[state.routes.length - 1].routeName
        ? null
        : getStateForAction(action, state);
};

/**
 * StackNavigator para telas abertas á partir da tela de eventos
 */
const EventosRouter = StackNavigator(
    {
        CalendarScreen: { screen: CalendarScreen },
        TarefasScreen: { screen: TarefasScreen },
        LancarNotasScreen: { screen: LancarNotasScreen },
        SetDateForTarefa: { screen: SetDateForTarefa },
    },
    {
        headerMode: 'none',
    },
);

/**
 * StackNavigator para telas abertas á partir da tela de eventos
 */
const OcorrenciasRouter = StackNavigator(
    {
        ListOcorrenciaScreen: { screen: ListOcorrenciaScreen },
        NovaOcorrenciasScreen: { screen: NovaOcorrenciasScreen },
        EditarOcorrenciasScreen: { screen: EditarOcorrenciasScreen },
    },
    {
        headerMode: 'none',
    },
);


EventosRouter.router.getStateForAction = navigateOnce(EventosRouter.router.getStateForAction);

const HomeRouter = TabNavigator(
    {
        EventosRouter: { screen: EventosRouter },
        AlertScreen: { screen: AlertScreen },
    },
    {
        tabBarComponent: HomeNavigator,
        tabBarPosition: 'bottom',
    },
);

export default DrawerNavigator(
    {
        OcorrenciasRouter: { screen: OcorrenciasRouter },
        HomeRouter: { screen: HomeRouter },
        ComunicadosScreen: { screen: ComunicadosScreen },
        FeedBackScreen: { screen: FeedBackScreen },
        HelpScreen: { screen: HelpScreen },
        FaltasScreen: { screen: FaltasScreen },
    },
    {
        headerMode: 'none',
        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: AppNavigator,
    },
);
