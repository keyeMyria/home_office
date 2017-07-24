// @flow
import { observable } from 'mobx';
import AlunoService from './../../services/AlunoService';

export default class AlunosStore {
    _service = new AlunoService();
    alunos = observable.map({});
    alunosByEvento = observable.map({});

    async fetchAlunos() {
        const alunos = await this._service.get();
        return alunos;
    }

    async fetchAlunosByEvent(event: Evento) {
        const alunos = await this._service.findByEvento(event);
        return alunos;
    }

}
