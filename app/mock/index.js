
/**
 * USUARIOS
 */
const usuarioPai = {
  name: 'Maycon Sousa',
  email: 'mayconfsousa@gmail.com'
};

/**
 * FILHOS
 */
const filhos = [
  {
    id: 1,
    nome: 'Caio'
  },
  {
    id: 2,
    nome: 'Filipe'
  },
  {
    id: 3,
    nome: 'Maria'
  }
];

/**
 * MENU
 */
const menu = {
  secoes: [
    {
      label: 'FUNCIONALIDADES',
      items: [
        {
          label: 'Visão Geral',
          iconName: 'home'
        },
        {
          label: 'Mensagens',
          iconName: 'sms'
        },
        {
          label: 'Histórico',
          iconName: 'history'
        },
        {
          label: 'Carga de Exercícios',
          iconName: 'library-books'
        },
        {
          label: 'Faltas e Ocorrências',
          iconName: 'highlight-off'
        },
      ]
    },
    {
      label: 'OUTROS',
      items: [
        {
          label: 'Dúvidas'
        },
        {
          label: 'Fale Conosco'
        },
        {
          label: 'Reportar Erros'
        },
        {
          label: 'Sobre'
        }
      ]
    }
  ]
};

/**
 * VISAO GERAL
 */
const visaoGeralFooterMenus = [
  {
    idFilho: 1,
    items: [
      {
        label: 'Agenda',
        iconName: 'event-note'
      },
      {
        label: 'Notas',
        iconName: 'filter-9-plus'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 3
      },
      {
        label: 'Exercícios',
        iconName: 'library-books'
      },
      {
        label: 'Planejar',
        iconName: 'tune'
      }
    ]
  },
  {
    idFilho: 2,
    items: [
      {
        label: 'Agenda',
        iconName: 'event-note'
      },
      {
        label: 'Notas',
        iconName: 'filter-9-plus'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 1
      },
      {
        label: 'Exercícios',
        iconName: 'library-books'
      },
      {
        label: 'Planejar',
        iconName: 'tune'
      }
    ]
  },
  {
    idFilho: 3,
    items: [
      {
        label: 'Agenda',
        iconName: 'event-note'
      },
      {
        label: 'Notas',
        iconName: 'filter-9-plus'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 2
      },
      {
        label: 'Exercícios',
        iconName: 'library-books'
      },
      {
        label: 'Planejar',
        iconName: 'tune'
      }
    ]
  }
];

/**
 * AGENDA SEMANA ATUAL
 */
const agendaSemanaAtual = [
  {
    idFilho: 1,
    agenda: {
      label: 'Semana Atual',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '7/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '8/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '8/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Matemática (7 exer. /14h30)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '9/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '10/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Sex.',
          diaMes: '11/ago',
          horario: '16:40',
          informacao: 'Prova de Matemática (10 pontos)'
        }
      ]
    }
  },
  {
    idFilho: 2,
    agenda: {
      label: 'Semana Atual',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '7/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '8/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '9/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '10/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Sex.',
          diaMes: '11/ago',
          horario: '16:40',
          informacao: 'Prova de Matemática (10 pontos)'
        }
      ]
    }
  },
  {
    idFilho: 3,
    agenda: {
      label: 'Semana Atual',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '7/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '8/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '9/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '10/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        }
      ]
    }
  }
];

/**
 * AGENDA PROXIMA SEMANA
 */
const agendaProximaSemana = [
  {
    idFilho: 1,
    agenda: {
      label: 'Próxima Semana',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '14/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '15/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '15/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Matemática (7 exer. /14h30)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '16/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '17/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Sex.',
          diaMes: '18/ago',
          horario: '16:40',
          informacao: 'Prova de Matemática (10 pontos)'
        }
      ]
    }
  },
  {
    idFilho: 2,
    agenda: {
      label: 'Próxima Semana',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '14/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '15/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '16/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '17/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Sex.',
          diaMes: '18/ago',
          horario: '16:40',
          informacao: 'Prova de Matemática (10 pontos)'
        }
      ]
    }
  },
  {
    idFilho: 3,
    agenda: {
      label: 'Próxima Semana',
      items: [
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Seg.',
          diaMes: '14/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
        },
        {
          tipo: 'E.P.',
          corTipo: '#FFF176',
          diaSemana: 'Ter.',
          diaMes: '15/ago',
          horario: undefined,
          informacao: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
        },
        {
          tipo: 'E.E.',
          corTipo: '#64B5F6',
          diaSemana: 'Qua.',
          diaMes: '16/ago',
          horario: '13:00',
          informacao: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
        },
        {
          tipo: 'P.',
          corTipo: '#E57373',
          diaSemana: 'Qui.',
          diaMes: '17/ago',
          horario: '14:40',
          informacao: 'Prova de Geografia (10 pontos)'
        }
      ]
    }
  }
];

/**
 * ALERTAS
 */
const alertas = [
  {
    idFilho: 1,
    items: [
      {
        title: 'Alerta 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 5',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 6',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 7',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      }
    ]
  },
  {
    idFilho: 2,
    items: [
      {
        title: 'Alerta 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 5',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      }
    ]
  },
  {
    idFilho: 3,
    items: [
      {
        title: 'Alerta 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: false
      },
      {
        title: 'Alerta 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      },
      {
        title: 'Alerta 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
        readed: true
      }
    ]
  }
];

/**
 * TEMPO CARGA EXERCICIOS
 */
const temposCargaExercicio = [
  {
    id: 0,
    label: '0min'
  },
  {
    id: 15,
    label: '15min'
  },
  {
    id: 30,
    label: '30min'
  },
  {
    id: 45,
    label: '45min'
  },
  {
    id: 60,
    label: '1h'
  },
  {
    id: 75,
    label: '1h15min'
  },
  {
    id: 90,
    label: '1h30min'
  },
  {
    id: 105,
    label: '1h45min'
  },
  {
    id: 120,
    label: '2h'
  },
];

/**
 * MATERIAS
 */
const materias = [
  {
    idFilho: 1,
    items: [
      {
        id: 'portugues',
        nome: 'Português'
      },
      {
        id: 'matematica',
        nome: 'Matemática'
      },
      {
        id: 'historia',
        nome: 'História'
      },
      {
        id: 'biologia',
        nome: 'Biologia'
      },
      {
        id: 'geografia',
        nome: 'Geografia'
      },
      {
        id: 'fisica',
        nome: 'Física'
      },
      {
        id: 'quimica',
        nome: 'Química'
      },
    ]
  },
  {
    idFilho: 2,
    items: [
      {
        id: 'portugues',
        nome: 'Português'
      },
      {
        id: 'matematica',
        nome: 'Matemática'
      },
      {
        id: 'historia',
        nome: 'História'
      },
      {
        id: 'biologia',
        nome: 'Biologia'
      },
      {
        id: 'geografia',
        nome: 'Geografia'
      },
      {
        id: 'fisica',
        nome: 'Física'
      },
      {
        id: 'quimica',
        nome: 'Química'
      },
    ]
  },
  {
    idFilho: 3,
    items: [
      {
        id: 'portugues',
        nome: 'Português'
      },
      {
        id: 'matematica',
        nome: 'Matemática'
      },
      {
        id: 'historia',
        nome: 'História'
      },
      {
        id: 'biologia',
        nome: 'Biologia'
      },
      {
        id: 'geografia',
        nome: 'Geografia'
      },
      {
        id: 'fisica',
        nome: 'Física'
      },
      {
        id: 'quimica',
        nome: 'Química'
      },
    ]
  }
];

/**
 * ALUNOS
 */
const alunos = [
  {
    id: 1,
    nome: 'Afonso Vilarim'
  },
  {
    id: 2,
    nome: 'Aluísio Barbosa'
  },
  {
    id: 3,
    nome: 'Belchior Guedelha'
  },
  {
    id: 4,
    nome: 'Carminda Bonilha'
  },
  {
    id: 5,
    nome: 'Conceição Torquato'
  },
  {
    id: 6,
    nome: 'Cristiana Bahía'
  },
  {
    id: 7,
    nome: 'Damião Varella'
  },
  {
    id: 8,
    nome: 'Denise Macena'
  },
  {
    id: 9,
    nome: 'Délio Bocaiúva'
  },
  {
    id: 10,
    nome: 'Délio Valadares'
  },
  {
    id: 11,
    nome: 'Ester Vaz'
  },
  {
    id: 12,
    nome: 'Frederico Lousã'
  },
  {
    id: 13,
    nome: 'Geraldo Miranda'
  },
  {
    id: 14,
    nome: 'Godinho ou Godim Melo'
  },
  {
    id: 15,
    nome: 'Horácio Fogaça'
  },
  {
    id: 16,
    nome: 'Ilma Vellozo'
  },
  {
    id: 17,
    nome: 'Isabel Avelar'
  },
  {
    id: 18,
    nome: 'Judite Zarco'
  },
  {
    id: 19,
    nome: 'Julieta Pasos'
  },
  {
    id: 20,
    nome: 'Lucília Carlos'
  },
  {
    id: 21,
    nome: 'Luzia Zalazar'
  },
  {
    id: 22,
    nome: 'Miriam Villégas'
  },
  {
    id: 23,
    nome: 'Noêmia Azeredo'
  },
  {
    id: 24,
    nome: 'Quintino Gorjão'
  },
  {
    id: 25,
    nome: 'Roberta Pedrozo'
  },
  {
    id: 26,
    nome: 'Rosália Silva'
  },
  {
    id: 27,
    nome: 'Rúben Pastana'
  },
  {
    id: 28,
    nome: 'Siquenique Portella'
  },
  {
    id: 29,
    nome: 'Uriel Acevedo'
  },
  {
    id: 30,
    nome: 'Zita Varela'
  },
];

/**
 * TURMAS
 */

const turmas = [
  '6 Ano - Turma A',
  '6 Ano - Turma B',
  '6 Ano - Turma C',
  '7 Ano - Turma A',
  '7 Ano - Turma B',
  '7 Ano - Turma C'
];

export {
  usuarioPai,
  filhos,
  menu,
  visaoGeralFooterMenus,
  agendaSemanaAtual,
  agendaProximaSemana,
  alertas,
  materias,
  temposCargaExercicio,
  alunos,
  turmas
};