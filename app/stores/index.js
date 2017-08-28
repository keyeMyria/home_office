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
    aluno = alunoStore.setRootStore(this);
    aviso = avisoStore.setRootStore(this);
    escola = escolaStore.setRootStore(this);
    eventos = eventosStore.setRootStore(this);
    professor = professorStore.setRootStore(this);
    responsavel = responsavelStore.setRootStore(this);
    ui = uiStore.setRootStore(this);
    user = userStore.setRootStore(this);
}
const rootStore = new RootStore();

export default rootStore;
