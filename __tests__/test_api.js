// @flow
// import { autorun } from 'mobx';
import userStore from './../app/stores/UserStore';
import { FaltaService } from './../app/services';

async function teste() {
    await userStore.login('professor', 'iogurte');

    const faltaService = new FaltaService();
    const faltas = await faltaService.get();
    console.log(faltas);
}

teste();
