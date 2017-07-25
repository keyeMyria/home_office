// @flow
// import { autorun } from 'mobx';
import userStore from './../app/stores/UserStore';
import { Nota, Aluno, Disciplina, Tarefa } from './../app/models';
import { AlunoService, DisciplinaService, TarefaService } from './../app/services';

// Falta por dia ou disciplina ou disciplina
// Campa disciplina

async function teste() {
    await userStore.login('professor', 'iogurte');

    const pontuacao = 10;
    const naoEntregue = null;
    const lancado = true;
    const _aluno = await new AlunoService().one(12).get();
    const aluno = new Aluno(_aluno);
    const _disciplina = await new DisciplinaService().one(1).get();
    const disciplina = new Disciplina(_disciplina);
    const _tarefa = await new TarefaService().one(1).get();
    const tarefa = new Tarefa(_tarefa);

    const nota = new Nota();
    nota.pontuacao = pontuacao;
    nota.naoEntregue = naoEntregue;
    nota.lancado = lancado;
    nota.aluno = aluno;
    nota.disciplina = disciplina;
    nota.tarefa = tarefa;

    console.log(nota.toJS());
}

teste();
