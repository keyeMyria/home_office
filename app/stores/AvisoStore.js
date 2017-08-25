// @flow
import { observable } from 'mobx';
import type { IObservableArray } from 'mobx';
import BaseStore from './../lib/BaseStore';

import AvisoService from './../services/AvisoService';
import { Aviso } from './../models';

type avisosItem = {
    data: string,
    titulo: string,
    detalhes: string,
    tipo: string,
    id: number,
};

type avisosSearchApiReturn = {
    semanas: { [string]: Array<avisosItem> },
};

class AvisoStore extends BaseStore {
    _service = new AvisoService();
    userRole: string;
    @observable loading = true;
    // $FlowFixMe
    @observable avisos: IObservableArray<Aviso> = [];
    @observable error = false;
    @observable errorMsg = 'Ocorreu um erro';

    /**
     * Populate the store with the 'Avisos' for the aluno
     */
    async fecthAvisosAluno(alunoId: number) {
        try {
            this.loading = true;
            const avisos = await this._service.findByAluno(alunoId);
            this.setAvisos(avisos);
        } catch (error) {
            this.error = true;
            this.loading = false;
            // TODO: setar uma setar uma mensagem de erro mais amigável
        }
    }

    /**
     * Populate the store with the 'Avisos' for the professor
     */
    async fecthAvisosProfessor(professorId: number) {
        try {
            this.loading = true;
            const avisos = await this._service.findByProfessor(professorId);
            this.setAvisos(avisos);
        } catch (error) {
            this.error = true;
            this.loading = false;
            // TODO: setar uma setar uma mensagem de erro mais amigável
        }
    }

    /**
     * Set's the avisos property
     */
    setAvisos(avisos: avisosSearchApiReturn) {
        const avisosArray = Object.keys(avisos.semanas).reduce(
            (p, key) => p.concat(avisos.semanas[key]),
            [],
        );
        this.avisos.replace(Aviso.fromArray(avisosArray));
        this.loading = false;
    }
}

const avisoStore = new AvisoStore();

export default avisoStore;
