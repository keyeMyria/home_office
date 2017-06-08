import { DrawerNavigator } from 'react-navigation';

// Components
import SideBar from './SideBar';
import VisaoGeral from './VisaoGeral';
import Mensagens from './Mensagens';
import Historico from './Historico';
import CargaExercicios from './CargaExercicios';
import FaltasOcorrencias from './FaltasOcorrencias';

const routes = {
  VisaoGeral: { screen: VisaoGeral },
  Mensagens: { screen: Mensagens },
  Historico: { screen: Historico },
  CargaExercicios: { screen: CargaExercicios },
  FaltasOcorrencias: { screen: FaltasOcorrencias },
};

const routerConfig = {
  headerMode: 'none',
  contentComponent: SideBar
};

export default DrawerNavigator(routes, routerConfig);