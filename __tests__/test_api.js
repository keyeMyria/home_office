// @flow
// import { autorun } from 'mobx';
import { AuthService } from '../app/services';
// import { AlunoService } from '../app/services';
// import alunoStore from '../app/stores/AlunoStore';

async function teste() {
    try {
        // console.log(alunoStore);

        const service = new AuthService();
        const { token, user, store } = await service.login('aluno', 'iogurte');
        // autorun(() => {
        //     console.log(store.loading);
        //     console.log(store.notas);
        // });
    } catch (error) {
        console.error(error);
        // throw error;
    }
}

teste();
