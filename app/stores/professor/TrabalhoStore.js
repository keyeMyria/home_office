// @flow

import { observable } from 'mobx';
import { TrabalhoService } from '../../services';

import ProfessorStore from '../../stores/ProfessorStore';

import CONFIG from '../../../config';

class TrabalhoStore {
    service: TrabalhoService = new TrabalhoService();
    @observable trabalhos: Array<any>; // TODO: Colocar o model especifico
    @observable errorMessage: string; // TODO: Add computed to show error message

    async save(data: Object) {
        const readyData = {
            ...data,
            disciplina: `${CONFIG.API.BASE_URL}disciplinas/${data.disciplina}`,
            titulo: 'Teste',
            ano: `${CONFIG.API.BASE_URL}anos/${ProfessorStore.anoSelectedId}`,
        };
        const result = await this.service.post(readyData);
        if (__DEV__) console.log(result); // eslint-disable-line
    }
}

const store = new TrabalhoStore();

export default store;
