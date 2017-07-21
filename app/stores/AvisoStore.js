// @flow
import { observable } from 'mobx';
import type { IObservableArray } from 'mobx';
import AvisoService from './../services/AvisoService';
import { Aviso } from './../models';

class AvisoStore {
    _service = new AvisoService();
    userRole: string;
    @observable loading = false;
    // $FlowFixMe
    @observable avisos: IObservableArray<Aviso> = [];
    @observable error = false;

    /**
   * Populate the store with the 'Avisos' for the aluno
   */
    async fecthAvisosAluno(alunoId: number) {
        const avisos = await this._service.findByAluno(alunoId);
        const avisosArray = Object.keys(avisos.semanas).reduce(
            (p, key) => p.concat(avisos.semanas[key]),
            [],
        );
        this.avisos.replace(new Aviso(avisosArray));
    }
}

const avisoStore = new AvisoStore();

export default avisoStore;
