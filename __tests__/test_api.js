import { autorun } from 'mobx';

import Ano from '../app/store/models/Ano';
import Disciplina from '../app/store/models/Disciplina';

async function teste() {
    console.log('Ano');
    const ano = await Ano.get(1);
    console.log(ano.titulo);
    console.log(ano.abreviacao);
    console.log(ano._selfLink);
    console.log(ano._related_disciplinas.slice());
    ano.disciplinas.forEach(d => console.log(d.titulo));

    // autorun(function(){

    // });

    // console.log(ano.disciplinas);

    // console.log('Disciplina');
    // const disciplina = await Disciplina.get(1);
    // console.log(disciplina.titulo);
    // console.log(disciplina.id);
    // console.log(disciplina._selfLink);

}

teste();