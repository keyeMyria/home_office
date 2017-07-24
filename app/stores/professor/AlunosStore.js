// @flow
import { observable } from 'mobx';
import AlunoService from './../../services/AlunoService';

export default class AlunosStore {
    alunos = observable.map({});

    async fetchAlunos() {
        const alunos = await new AlunoService().get();
        return alunos;
    }
}
