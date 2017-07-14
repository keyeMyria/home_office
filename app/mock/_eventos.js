const tarefasJson = require('./tarefas.json');
const turmasJson = require('./turmas.json');

const tarefas = new Map();
const turmas = new Map();

tarefasJson.forEach((tarefa) => {
    tarefas.set(tarefa.id, tarefa);
});

turmasJson.forEach((turma) => {
    turmas.set(turma.id, turma);
});

const eventosArray = [
    ['2017-07-07T00:00:00', '2017-07-07T00:00:00', 4, 25, null],
    ['2017-07-07T00:00:00', '2017-07-07T00:00:00', 4, 27, null],
    ['2017-07-10T00:00:00', '2017-07-10T00:00:00', 5, 25, null],
    ['2017-07-10T00:00:00', '2017-07-10T00:00:00', 5, 27, null],
    ['2017-07-18T00:00:00', '2017-07-18T00:00:00', 2, 25, null],
    ['2017-07-18T00:00:00', '2017-07-18T00:00:00', 2, 27, null],
    ['2017-07-25T00:00:00', '2017-07-25T00:00:00', 1, 25, null],
    ['2017-07-25T00:00:00', '2017-07-25T00:00:00', 1, 27, null],
];

const eventos = eventosArray.map(([fim, inicio, tarefaId, turmaId, duracao]) => ({
    inicio: new Date(inicio),
    fim: new Date(fim),
    tarefa: tarefas.get(tarefaId),
    turma: turmas.get(turmaId),
    duracao,
}));

export default eventos;
