import alunoStore from './AlunoStore';
import avisoStore from './AvisoStore';
import escolaStore from './EscolaStore';
import eventosStore from './EventosStore';
import professorStore from './ProfessorStore';
import responsavelStore from './ResponsavelStore';
import uiStore from './UiStore';
import userStore from './UserStore';

export {
    alunoStore,
    avisoStore,
    escolaStore,
    eventosStore,
    professorStore,
    responsavelStore,
    uiStore,
    userStore,
};

class RootStore {
    alunoStore = alunoStore.setRootStore(this);
    avisoStore = avisoStore.setRootStore(this);
    escolaStore = escolaStore.setRootStore(this);
    eventosStore = eventosStore.setRootStore(this);
    professorStore = professorStore.setRootStore(this);
    responsavelStore = responsavelStore.setRootStore(this);
    uiStore = uiStore.setRootStore(this);
    userStore = userStore.setRootStore(this);
}
const rootStore = new RootStore();

export default rootStore;
