
/**
 * USERS
 */
const users = [
  {
    name: 'Maycon Sousa',
    email: 'mayconfsousa@gmail.com'
  }
];

/**
 * CHILD STUDENTS
 */
const childStudents = [
  {
    id: 1,
    name: 'Caio'
  },
  {
    id: 2,
    name: 'Filipe'
  },
  {
    id: 3,
    name: 'Arwen'
  }
];

/**
 * CALENDARS
 */
const calendars = [
  {
    studentId: 1,
    currentWeekItems: [
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Seg.',
        date: '7/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '8/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '8/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Matemática (7 exer. /14h30)'
      },
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Qua.',
        date: '9/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Qui.',
        date: '10/ago',
        time: '14:40',
        information: 'Prova de Geografia (10 pontos)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Sex.',
        date: '11/ago',
        time: '16:40',
        information: 'Prova de Matemática (10 pontos)'
      }
    ],
    nextWeekItems: [
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Seg.',
        date: '14/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '15/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
      },
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Qua.',
        date: '16/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Qui.',
        date: '17/ago',
        time: '14:40',
        information: 'Prova de Geografia (10 pontos)'
      }
    ],
  },
  {
    studentId: 2,
    currentWeekItems: [
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Seg.',
        date: '7/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '8/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
      },
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Qua.',
        date: '9/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Qui.',
        date: '10/ago',
        time: '14:40',
        information: 'Prova de Geografia (10 pontos)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Sex.',
        date: '11/ago',
        time: '16:40',
        information: 'Prova de Matemática (10 pontos)'
      }
    ],
    nextWeekItems: [
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Seg.',
        date: '14/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '15/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
      },
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Qua.',
        date: '16/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Qui.',
        date: '17/ago',
        time: '14:40',
        information: 'Prova de Geografia (10 pontos)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Sex.',
        date: '18/ago',
        time: '16:40',
        information: 'Prova de Matemática (10 pontos)'
      }
    ],
  },
  {
    studentId: 3,
    currentWeekItems: [
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Seg.',
        date: '7/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)'
      },
      {
        type: 'E.P.',
        colorType: '#FFF176',
        dayOfWeek: 'Ter.',
        date: '8/ago',
        time: undefined,
        information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)'
      },
      {
        type: 'E.E.',
        colorType: '#64B5F6',
        dayOfWeek: 'Qua.',
        date: '9/ago',
        time: '13:00',
        information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)'
      },
      {
        type: 'P.',
        colorType: '#E57373',
        dayOfWeek: 'Qui.',
        date: '10/ago',
        time: '14:40',
        information: 'Prova de Geografia (10 pontos)'
      }
    ],
    nextWeekItems: [],
  }
];

/**
 * ALERTS
 */
const alerts = [
  {
    studentId: 1,
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
    studentId: 2,
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
    studentId: 3,
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
 * PLANNING TIMES
 */
const planningTimes = [
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
 * SUBJECT AREAS
 */
const subjectAreas = [
  {
    studentId: 1,
    items: [
      {
        key: 'portugues',
        name: 'Português'
      },
      {
        key: 'matematica',
        name: 'Matemática'
      },
      {
        key: 'historia',
        name: 'História'
      },
      {
        key: 'biologia',
        name: 'Biologia'
      },
      {
        key: 'geografia',
        name: 'Geografia'
      },
      {
        key: 'fisica',
        name: 'Física'
      },
      {
        key: 'quimica',
        name: 'Química'
      },
    ]
  },
  {
    studentId: 2,
    items: [
      {
        key: 'portugues',
        name: 'Português'
      },
      {
        key: 'matematica',
        name: 'Matemática'
      },
      {
        key: 'historia',
        name: 'História'
      },
      {
        key: 'biologia',
        name: 'Biologia'
      },
      {
        key: 'geografia',
        name: 'Geografia'
      },
      {
        key: 'fisica',
        name: 'Física'
      },
      {
        key: 'quimica',
        name: 'Química'
      },
    ]
  },
  {
    studentId: 3,
    items: [
      {
        key: 'portugues',
        name: 'Português'
      },
      {
        key: 'matematica',
        name: 'Matemática'
      },
      {
        key: 'historia',
        name: 'História'
      },
      {
        key: 'biologia',
        name: 'Biologia'
      },
      {
        key: 'geografia',
        name: 'Geografia'
      },
      {
        key: 'fisica',
        name: 'Física'
      },
      {
        key: 'quimica',
        name: 'Química'
      },
    ]
  }
];

/**
 * STUDENTS
 */
const students = [
  {
    id: 1,
    name: 'Caio Gazola'
  },
  {
    id: 2,
    name: 'Filipe Mendes'
  },
  {
    id: 3,
    name: 'Arwen Undómiel'
  },
  {
    id: 4,
    name: 'Carminda Bonilha'
  },
  {
    id: 5,
    name: 'Conceição Torquato'
  },
  {
    id: 6,
    name: 'Cristiana Bahía'
  },
  {
    id: 7,
    name: 'Damião Varella'
  },
  {
    id: 8,
    name: 'Denise Macena'
  },
  {
    id: 9,
    name: 'Délio Bocaiúva'
  },
  {
    id: 10,
    name: 'Délio Valadares'
  },
  {
    id: 11,
    name: 'Ester Vaz'
  },
  {
    id: 12,
    name: 'Frederico Lousã'
  },
  {
    id: 13,
    name: 'Geraldo Miranda'
  },
  {
    id: 14,
    name: 'Godinho ou Godim Melo'
  },
  {
    id: 15,
    name: 'Horácio Fogaça'
  },
  {
    id: 16,
    name: 'Ilma Vellozo'
  },
  {
    id: 17,
    name: 'Isabel Avelar'
  },
  {
    id: 18,
    name: 'Judite Zarco'
  },
  {
    id: 19,
    name: 'Julieta Pasos'
  },
  {
    id: 20,
    name: 'Lucília Carlos'
  },
  {
    id: 21,
    name: 'Luzia Zalazar'
  },
  {
    id: 22,
    name: 'Miriam Villégas'
  },
  {
    id: 23,
    name: 'Noêmia Azeredo'
  },
  {
    id: 24,
    name: 'Quintino Gorjão'
  },
  {
    id: 25,
    name: 'Roberta Pedrozo'
  },
  {
    id: 26,
    name: 'Rosália Silva'
  },
  {
    id: 27,
    name: 'Rúben Pastana'
  },
  {
    id: 28,
    name: 'Siquenique Portella'
  },
  {
    id: 29,
    name: 'Uriel Acevedo'
  },
  {
    id: 30,
    name: 'Zita Varela'
  },
];

/**
 * CLASSES
 */
const classes = [
  { id: 1, name: '6 Ano - Turma A' },
  { id: 2, name: '6 Ano - Turma B' },
  { id: 3, name: '6 Ano - Turma C' },
  { id: 4, name: '7 Ano - Turma A' },
  { id: 5, name: '7 Ano - Turma B' },
  { id: 6, name: '7 Ano - Turma C' },
];

/**
 * SCHOOL YEARS
 */
const schoolYears = [
  {
    id: 1,
    name: '6º',
    classes: [
      { id: 1, name: 'Turma A' },
      { id: 2, name: 'Turma B' },
      { id: 3, name: 'Turma C' },
    ]
  },
  {
    id: 2,
    name: '7º',
    classes: [
      { id: 1, name: 'Turma A' },
      { id: 2, name: 'Turma B' },
      { id: 3, name: 'Turma C' },
    ]
  },
  {
    id: 3,
    name: '8º',
    classes: [
      { id: 1, name: 'Turma A' },
      { id: 2, name: 'Turma B' },
      { id: 3, name: 'Turma C' },
    ]
  },
  {
    id: 4,
    name: '9º',
    classes: [
      { id: 1, name: 'Turma A' },
      { id: 2, name: 'Turma B' },
      { id: 3, name: 'Turma C' },
    ]
  }
];

/**
 * OCCURRENCE REASONS
 */
const occurrenceReasons = [
  { id: 0, name: 'Selecione' },
  { id: 1, name: 'Conversa constante' },
  { id: 2, name: 'Demora a retornar do recreio' },
  { id: 3, name: 'Desrespeito a colegas' },
  { id: 4, name: 'Desrespeito a funcionários' },
  { id: 5, name: 'Outros motivos' },
];

export {
  users,
  childStudents,
  calendars,
  alerts,
  subjectAreas,
  planningTimes,
  students,
  classes,
  occurrenceReasons,
  schoolYears,
};