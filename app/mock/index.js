
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
    id: 1,
    key: 'portugues',
    name: 'Português',
    topics: [
      { id: 10, name: 'Português - Tópico 1' },
      { id: 11, name: 'Português - Tópico 2' },
      { id: 12, name: 'Português - Tópico 3' },
      { id: 13, name: 'Português - Tópico 4' },
      { id: 14, name: 'Português - Tópico 5' },
      { id: 15, name: 'Português - Tópico 6' },
      { id: 16, name: 'Português - Tópico 7' },
    ]
  },
  {
    id: 2,
    key: 'matematica',
    name: 'Matemática',
    topics: [
      { id: 20, name: 'Matemática - Tópico 1' },
      { id: 21, name: 'Matemática - Tópico 2' },
      { id: 22, name: 'Matemática - Tópico 3' },
      { id: 23, name: 'Matemática - Tópico 4' },
      { id: 24, name: 'Matemática - Tópico 5' },
      { id: 25, name: 'Matemática - Tópico 6' },
      { id: 26, name: 'Matemática - Tópico 7' },
    ]
  },
  {
    id: 3,
    key: 'historia',
    name: 'História',
    topics: [
      { id: 30, name: 'História - Tópico 1' },
      { id: 31, name: 'História - Tópico 2' },
      { id: 32, name: 'História - Tópico 3' },
      { id: 33, name: 'História - Tópico 4' },
      { id: 34, name: 'História - Tópico 5' },
      { id: 35, name: 'História - Tópico 6' },
      { id: 36, name: 'História - Tópico 7' },
    ]
  },
  {
    id: 4,
    key: 'biologia',
    name: 'Biologia',
    topics: [
      { id: 40, name: 'Biologia - Tópico 1' },
      { id: 41, name: 'Biologia - Tópico 2' },
      { id: 42, name: 'Biologia - Tópico 3' },
      { id: 43, name: 'Biologia - Tópico 4' },
      { id: 44, name: 'Biologia - Tópico 5' },
      { id: 45, name: 'Biologia - Tópico 6' },
      { id: 46, name: 'Biologia - Tópico 7' },
    ]
  },
  {
    id: 5,
    key: 'geografia',
    name: 'Geografia',
    topics: [
      { id: 50, name: 'Geografia - Tópico 1' },
      { id: 51, name: 'Geografia - Tópico 2' },
      { id: 52, name: 'Geografia - Tópico 3' },
      { id: 53, name: 'Geografia - Tópico 4' },
      { id: 54, name: 'Geografia - Tópico 5' },
      { id: 55, name: 'Geografia - Tópico 6' },
      { id: 56, name: 'Geografia - Tópico 7' },
    ]
  },
  {
    id: 6,
    key: 'fisica',
    name: 'Física',
    topics: [
      { id: 60, name: 'Física - Tópico 1' },
      { id: 61, name: 'Física - Tópico 2' },
      { id: 62, name: 'Física - Tópico 3' },
      { id: 63, name: 'Física - Tópico 4' },
      { id: 64, name: 'Física - Tópico 5' },
      { id: 65, name: 'Física - Tópico 6' },
      { id: 66, name: 'Física - Tópico 7' },
    ]
  },
  {
    id: 7,
    key: 'quimica',
    name: 'Química',
    topics: [
      { id: 70, name: 'Química - Tópico 1' },
      { id: 71, name: 'Química - Tópico 2' },
      { id: 72, name: 'Química - Tópico 3' },
      { id: 73, name: 'Química - Tópico 4' },
      { id: 74, name: 'Química - Tópico 5' },
      { id: 75, name: 'Química - Tópico 6' },
      { id: 76, name: 'Química - Tópico 7' },
    ]
  },
];

const studentSubjectAreas = [
  {
    studentId: 1,
    items: subjectAreas
  },
  {
    studentId: 2,
    items: subjectAreas
  },
  {
    studentId: 3,
    items: subjectAreas
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
      { id: 1, key: 'turmaA', name: 'Turma A' },
      { id: 2, key: 'turmaB', name: 'Turma B' },
      { id: 3, key: 'turmaC', name: 'Turma C' },
      { id: 4, key: 'turmaD', name: 'Turma D' },
    ]
  },
  {
    id: 2,
    name: '7º',
    classes: [
      { id: 1, key: 'turmaA', name: 'Turma A' },
      { id: 2, key: 'turmaB', name: 'Turma B' },
      { id: 3, key: 'turmaC', name: 'Turma C' },
    ]
  },
  {
    id: 3,
    name: '8º',
    classes: [
      { id: 1, key: 'turmaA', name: 'Turma A' },
      { id: 2, key: 'turmaB', name: 'Turma B' },
      { id: 3, key: 'turmaC', name: 'Turma C' },
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
  studentSubjectAreas,
  subjectAreas,
  planningTimes,
  students,
  classes,
  occurrenceReasons,
  schoolYears,
};