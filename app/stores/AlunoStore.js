import { observable, action, computed } from 'mobx';
import AlunoService from './../services/AlunoService';
import { Aluno } from './../models';
import type { Nota } from './../models';

class AlunoStore {
    _service = new AlunoService();
    @observable id: ?number;
    @observable loading = false;
    @observable aluno: Aluno;

    @action
    async fetchAluno(id) {
        this.id = id;
        this.loading = true;
        const aluno = await this._service.one(this.id).get();
        this.aluno = new Aluno(aluno);
        this.loading = false;
        return this;
    }

    @computed
    get notas(): Array<Nota> {
        return this.aluno ? this.aluno.notas : [];
    }

    @computed
    get avisos(): Array<Nota> {
        // return this.aluno ? this.aluno.notas : [];
    }

}

export default new AlunoStore();
