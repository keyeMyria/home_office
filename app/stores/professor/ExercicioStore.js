// @flow

import { observable } from 'mobx';
import { ExercicioService } from '../../services';

import ProfessorStore from '../../stores/ProfessorStore';

import CONFIG from './../../../config';

class ExercicioStore {
    service: ExercicioService = new ExercicioService();
    @observable exercicios: Array<any>; // TODO: Colocar o model especifico

    async load() {
        const result = await this.service.get();
        this.exercicios = result.exercicios;
    }

    async save(data: Object) {
        const readyData = {
            ...data,
            disciplina: `${CONFIG.API.BASE_URL}disciplinas/${data.disciplina}`,
            titulo: 'Teste',
            topicos: data.topicos
                ? data.topicos.map(item => `${CONFIG.API.BASE_URL}topicos/${item}`)
                : [],
            ano: `${CONFIG.API.BASE_URL}anos/${ProfessorStore.anoSelectedId}`,
        };
        const result = await this.service.post(readyData);
        if (__DEV__) console.log(result); // eslint-disable-line
    }
}

const store = new ExercicioStore();

export default store;
