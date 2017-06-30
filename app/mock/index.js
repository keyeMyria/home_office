/**
 * COLORS
 */
const EXAM_COLOR = '#E57373';
const SCHOOL_EXERCICE_COLOR = '#64B5F6';
const PREPARATORY_EXERCICE_COLOR = '#FFF176';

const QUESTION_HARD_COLOR = '#ffcdd2';
const QUESTION_MEDIUM_COLOR = '#FFF9C4';
const QUESTION_EASY_COLOR = '#C8E6C9';

/**
 * USERS
 */
const users = [
    {
        name: 'Maycon Sousa',
        email: 'mayconfsousa@gmail.com',
    },
];

/**
 * CHILD STUDENTS
 */
const childStudents = [
    {
        id: 1,
        name: 'Caio',
    },
    {
        id: 2,
        name: 'Filipe',
    },
    {
        id: 3,
        name: 'Arwen',
    },
];

/**
 * GRADES (STUDENT)
 */
const grades = [
    {
        studentId: 1,
        items: [
            { id: 1, name: 'Física', pointsGiven: 51, pointsReceived: 39 },
            { id: 2, name: 'Redação', pointsGiven: 56, pointsReceived: 45 },
            { id: 3, name: 'História', pointsGiven: 55, pointsReceived: 44 },
            { id: 4, name: 'Geografia', pointsGiven: 57, pointsReceived: 31 },
            { id: 5, name: 'Quimica', pointsGiven: 51, pointsReceived: 35 },
            { id: 6, name: 'Biologia', pointsGiven: 53, pointsReceived: 42 },
            { id: 7, name: 'Matemática', pointsGiven: 52, pointsReceived: 40 },
            { id: 8, name: 'Português', pointsGiven: 55, pointsReceived: 33 },
        ],
    },
    {
        studentId: 2,
        items: [
            { id: 1, name: 'Física', pointsGiven: 51, pointsReceived: 29 },
            { id: 2, name: 'Redação', pointsGiven: 56, pointsReceived: 35 },
            { id: 3, name: 'História', pointsGiven: 55, pointsReceived: 34 },
            { id: 4, name: 'Geografia', pointsGiven: 57, pointsReceived: 21 },
            { id: 5, name: 'Quimica', pointsGiven: 51, pointsReceived: 25 },
            { id: 6, name: 'Biologia', pointsGiven: 53, pointsReceived: 32 },
            { id: 7, name: 'Matemática', pointsGiven: 52, pointsReceived: 30 },
            { id: 8, name: 'Português', pointsGiven: 55, pointsReceived: 33 },
        ],
    },
    {
        studentId: 3,
        items: [
            { id: 1, name: 'Física', pointsGiven: 51, pointsReceived: 48 },
            { id: 2, name: 'Redação', pointsGiven: 56, pointsReceived: 56 },
            { id: 3, name: 'História', pointsGiven: 55, pointsReceived: 5 },
            { id: 4, name: 'Geografia', pointsGiven: 57, pointsReceived: 38 },
            { id: 5, name: 'Quimica', pointsGiven: 51, pointsReceived: 45 },
            { id: 6, name: 'Biologia', pointsGiven: 53, pointsReceived: 50 },
            { id: 7, name: 'Matemática', pointsGiven: 52, pointsReceived: 49 },
            { id: 8, name: 'Português', pointsGiven: 55, pointsReceived: 50 },
        ],
    },
];

/**
 * CALENDARS (STUDENT)
 */
const calendars = [
    {
        studentId: 1,
        currentWeekItems: [
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Seg.',
                date: '7/ago',
                datetime: '2017-08-07T16:00:00Z',
                title: 'Lista de Português',
                grade: null,
                time: '13:00',
                information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
            },
            {
                type: 'E.P.',
                colorType: PREPARATORY_EXERCICE_COLOR,
                dayOfWeek: 'Ter.',
                date: '8/ago',
                time: undefined,
                datetime: '2017-08-08T12:00:00Z',
                title: 'Exercícios Preparatórios - Geografia',
                grade: null,
                information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
            },
            {
                type: 'E.P.',
                colorType: PREPARATORY_EXERCICE_COLOR,
                dayOfWeek: 'Ter.',
                date: '8/ago',
                time: undefined,
                datetime: '2017-08-07T16:00:00Z',
                title: 'Exercícios Preparatórios - Matemática',
                grade: null,
                information: 'Exercícios Preparatórios - Matemática (7 exer. /14h30)',
            },
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Qua.',
                date: '9/ago',
                time: '13:00',
                datetime: '2017-08-09T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
            },
            {
                type: 'P.',
                colorType: EXAM_COLOR,
                dayOfWeek: 'Qui.',
                date: '10/ago',
                time: '14:40',
                datetime: '2017-08-07T16:00:00Z',
                title: 'Prova de Geografia',
                grade: 10,
                information: 'Prova de Geografia (10 pontos)',
            },
            {
                type: 'P.',
                colorType: EXAM_COLOR,
                dayOfWeek: 'Sex.',
                date: '11/ago',
                time: '16:40',
                datetime: '2017-08-07T19:40:00Z',
                title: 'Prova de Matemática',
                grade: 10,
                information: 'Prova de Matemática (10 pontos)',
            },
        ],
        nextWeekItems: [
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Seg.',
                date: '14/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Português',
                grade: null,
                information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
            },
            {
                type: 'E.P.',
                colorType: PREPARATORY_EXERCICE_COLOR,
                dayOfWeek: 'Ter.',
                date: '15/ago',
                time: undefined,
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Português',
                grade: null,
                information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
            },
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Qua.',
                date: '16/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
            },
            {
                type: 'P.',
                colorType: EXAM_COLOR,
                dayOfWeek: 'Qui.',
                date: '17/ago',
                time: '14:40',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Prova de Geografia',
                grade: 10,
                information: 'Prova de Geografia (10 pontos)',
            },
        ],
    },
    {
        studentId: 2,
        currentWeekItems: [
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Seg.',
                date: '7/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
            },
            {
                type: 'E.P.',
                colorType: PREPARATORY_EXERCICE_COLOR,
                dayOfWeek: 'Ter.',
                date: '8/ago',
                time: undefined,
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
            },
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Qua.',
                date: '9/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
            },
            {
                type: 'P.',
                colorType: EXAM_COLOR,
                dayOfWeek: 'Sex.',
                date: '11/ago',
                time: '16:40',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Prova de Matemática (10 pontos)',
            },
        ],
        nextWeekItems: [
            {
                type: 'E.E.',
                colorType: SCHOOL_EXERCICE_COLOR,
                dayOfWeek: 'Qua.',
                date: '16/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
            },
            {
                type: 'P.',
                colorType: '#E57373',
                dayOfWeek: 'Qui.',
                date: '17/ago',
                time: '14:40',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Prova de Geografia (10 pontos)',
            },
            {
                type: 'P.',
                colorType: '#E57373',
                dayOfWeek: 'Sex.',
                date: '18/ago',
                time: '16:40',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Prova de Matemática (10 pontos)',
            },
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
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
            },
            {
                type: 'E.P.',
                colorType: PREPARATORY_EXERCICE_COLOR,
                dayOfWeek: 'Ter.',
                date: '8/ago',
                time: undefined,
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
            },
            {
                type: 'E.E.',
                colorType: '#64B5F6',
                dayOfWeek: 'Qua.',
                date: '9/ago',
                time: '13:00',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
            },
            {
                type: 'P.',
                colorType: '#E57373',
                dayOfWeek: 'Qui.',
                date: '10/ago',
                time: '14:40',
                datetime: '2017-08-14T16:00:00Z',
                title: 'Lista de Biologia',
                grade: null,
                information: 'Prova de Geografia (10 pontos)',
            },
        ],
        nextWeekItems: [],
    },
];

/**
 * CALENDAR (TEACHER)
 */
const teacherCalendar = {
    currentWeekItems: [
        {
            type: 'P.',
            colorType: '#E57373',
            dayOfWeek: 'Qui.',
            date: '17/ago',
            time: '14:40',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Prova de Geografia',
            grade: 10,
            turma: '6 Ano - Turma A',
            information: 'Prova de Geografia (10 pontos)',
        },
        {
            type: 'E.E.',
            colorType: '#64B5F6',
            dayOfWeek: 'Qua.',
            date: '16/ago',
            time: '13:00',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Lista de Biologia',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
        },
        {
            type: 'E.P.',
            colorType: PREPARATORY_EXERCICE_COLOR,
            dayOfWeek: 'Ter.',
            date: '15/ago',
            time: undefined,
            datetime: '2017-08-14T16:00:00Z',
            title: 'Exercícios Geografia',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
        },
        {
            type: 'E.E.',
            colorType: '#64B5F6',
            dayOfWeek: 'Seg.',
            date: '14/ago',
            time: '13:00',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Exercícios Geografia',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
        },
    ],
    lastWeekItems: [
        {
            type: 'P.',
            colorType: '#E57373',
            dayOfWeek: 'Sex.',
            date: '11/ago',
            time: '16:40',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Prova de Matemática',
            grade: 10,
            turma: '6 Ano - Turma A',
            information: 'Prova de Matemática (10 pontos)',
        },
        {
            type: 'P.',
            colorType: '#E57373',
            dayOfWeek: 'Qui.',
            date: '10/ago',
            time: '14:40',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Prova de Geografia',
            grade: 10,
            turma: '6 Ano - Turma A',
            information: 'Prova de Geografia (10 pontos)',
        },
        {
            type: 'E.E.',
            colorType: '#64B5F6',
            dayOfWeek: 'Qua.',
            date: '9/ago',
            time: '13:00',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Lista de Biologia',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios da Escola - Lista de Biologia (8 exer. / 0h50)',
        },
        {
            type: 'E.P.',
            colorType: PREPARATORY_EXERCICE_COLOR,
            dayOfWeek: 'Ter.',
            date: '8/ago',
            time: undefined,
            datetime: '2017-08-14T16:00:00Z',
            title: 'Exercícios Matemática',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios Preparatórios - Matemática (7 exer. /14h30)',
        },
        {
            type: 'E.P.',
            colorType: PREPARATORY_EXERCICE_COLOR,
            dayOfWeek: 'Ter.',
            date: '8/ago',
            time: undefined,
            datetime: '2017-08-14T16:00:00Z',
            title: 'Exercícios Geografia',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios Preparatórios - Geografia (10 exer. /1h00)',
        },
        {
            type: 'E.E.',
            colorType: '#64B5F6',
            dayOfWeek: 'Seg.',
            date: '7/ago',
            time: '13:00',
            datetime: '2017-08-14T16:00:00Z',
            title: 'Lista de Português',
            grade: null,
            turma: '6 Ano - Turma A',
            information: 'Exercícios da Escola - Lista de Português (7 exer. / 1h15)',
        },
    ],
};

/**
 * ALERTS
 */
const alerts = [
    {
        studentId: 1,
        items: [
            {
                title: 'Alerta 1',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 2',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 3',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 4',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 5',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 6',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 7',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
        ],
    },
    {
        studentId: 2,
        items: [
            {
                title: 'Alerta 1',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 2',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 3',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 4',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 5',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
        ],
    },
    {
        studentId: 3,
        items: [
            {
                title: 'Alerta 1',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 2',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: false,
            },
            {
                title: 'Alerta 3',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
            {
                title: 'Alerta 4',
                message:
                    'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. ',
                readed: true,
            },
        ],
    },
];

/**
 * PLANNING TIMES
 */
const planningTimes = [
    {
        id: 0,
        label: '0min',
    },
    {
        id: 15,
        label: '15min',
    },
    {
        id: 30,
        label: '30min',
    },
    {
        id: 45,
        label: '45min',
    },
    {
        id: 60,
        label: '1h',
    },
    {
        id: 75,
        label: '1h15min',
    },
    {
        id: 90,
        label: '1h30min',
    },
    {
        id: 105,
        label: '1h45min',
    },
    {
        id: 120,
        label: '2h',
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
            {
                id: 10,
                name: 'Português - Tópico 1',
                subtopics: [
                    { id: 101, name: 'Subtópico 1' },
                    { id: 102, name: 'Subtópico 2' },
                    { id: 103, name: 'Subtópico 3' },
                ],
            },
            {
                id: 11,
                name: 'Português - Tópico 2',
                subtopics: [
                    { id: 111, name: 'Subtópico 1' },
                    { id: 112, name: 'Subtópico 2' },
                    { id: 113, name: 'Subtópico 3' },
                ],
            },
            {
                id: 12,
                name: 'Português - Tópico 3',
                subtopics: [
                    { id: 121, name: 'Subtópico 1' },
                    { id: 122, name: 'Subtópico 2' },
                    { id: 123, name: 'Subtópico 3' },
                ],
            },
            {
                id: 13,
                name: 'Português - Tópico 4',
                subtopics: [
                    { id: 131, name: 'Subtópico 1' },
                    { id: 132, name: 'Subtópico 2' },
                    { id: 133, name: 'Subtópico 3' },
                ],
            },
            {
                id: 14,
                name: 'Português - Tópico 5',
                subtopics: [
                    { id: 141, name: 'Subtópico 1' },
                    { id: 142, name: 'Subtópico 2' },
                    { id: 143, name: 'Subtópico 3' },
                ],
            },
            {
                id: 15,
                name: 'Português - Tópico 6',
                subtopics: [
                    { id: 151, name: 'Subtópico 1' },
                    { id: 152, name: 'Subtópico 2' },
                    { id: 153, name: 'Subtópico 3' },
                ],
            },
            {
                id: 16,
                name: 'Português - Tópico 7',
                subtopics: [
                    { id: 161, name: 'Subtópico 1' },
                    { id: 162, name: 'Subtópico 2' },
                    { id: 163, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 2,
        key: 'matematica',
        name: 'Matemática',
        topics: [
            {
                id: 20,
                name: 'Matemática - Tópico 1',
                subtopics: [
                    { id: 201, name: 'Subtópico 1' },
                    { id: 202, name: 'Subtópico 2' },
                    { id: 203, name: 'Subtópico 3' },
                ],
            },
            {
                id: 21,
                name: 'Matemática - Tópico 2',
                subtopics: [
                    { id: 211, name: 'Subtópico 1' },
                    { id: 212, name: 'Subtópico 2' },
                    { id: 213, name: 'Subtópico 3' },
                ],
            },
            {
                id: 22,
                name: 'Matemática - Tópico 3',
                subtopics: [
                    { id: 221, name: 'Subtópico 1' },
                    { id: 222, name: 'Subtópico 2' },
                    { id: 223, name: 'Subtópico 3' },
                ],
            },
            {
                id: 23,
                name: 'Matemática - Tópico 4',
                subtopics: [
                    { id: 231, name: 'Subtópico 1' },
                    { id: 232, name: 'Subtópico 2' },
                    { id: 233, name: 'Subtópico 3' },
                ],
            },
            {
                id: 24,
                name: 'Matemática - Tópico 5',
                subtopics: [
                    { id: 241, name: 'Subtópico 1' },
                    { id: 242, name: 'Subtópico 2' },
                    { id: 243, name: 'Subtópico 3' },
                ],
            },
            {
                id: 25,
                name: 'Matemática - Tópico 6',
                subtopics: [
                    { id: 251, name: 'Subtópico 1' },
                    { id: 252, name: 'Subtópico 2' },
                    { id: 253, name: 'Subtópico 3' },
                ],
            },
            {
                id: 26,
                name: 'Matemática - Tópico 7',
                subtopics: [
                    { id: 261, name: 'Subtópico 1' },
                    { id: 262, name: 'Subtópico 2' },
                    { id: 263, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 3,
        key: 'historia',
        name: 'História',
        topics: [
            {
                id: 30,
                name: 'História - Tópico 1',
                subtopics: [
                    { id: 301, name: 'Subtópico 1' },
                    { id: 302, name: 'Subtópico 2' },
                    { id: 303, name: 'Subtópico 3' },
                ],
            },
            {
                id: 31,
                name: 'História - Tópico 2',
                subtopics: [
                    { id: 311, name: 'Subtópico 1' },
                    { id: 312, name: 'Subtópico 2' },
                    { id: 313, name: 'Subtópico 3' },
                ],
            },
            {
                id: 32,
                name: 'História - Tópico 3',
                subtopics: [
                    { id: 321, name: 'Subtópico 1' },
                    { id: 322, name: 'Subtópico 2' },
                    { id: 323, name: 'Subtópico 3' },
                ],
            },
            {
                id: 33,
                name: 'História - Tópico 4',
                subtopics: [
                    { id: 331, name: 'Subtópico 1' },
                    { id: 332, name: 'Subtópico 2' },
                    { id: 333, name: 'Subtópico 3' },
                ],
            },
            {
                id: 34,
                name: 'História - Tópico 5',
                subtopics: [
                    { id: 341, name: 'Subtópico 1' },
                    { id: 342, name: 'Subtópico 2' },
                    { id: 343, name: 'Subtópico 3' },
                ],
            },
            {
                id: 35,
                name: 'História - Tópico 6',
                subtopics: [
                    { id: 351, name: 'Subtópico 1' },
                    { id: 352, name: 'Subtópico 2' },
                    { id: 353, name: 'Subtópico 3' },
                ],
            },
            {
                id: 36,
                name: 'História - Tópico 7',
                subtopics: [
                    { id: 361, name: 'Subtópico 1' },
                    { id: 362, name: 'Subtópico 2' },
                    { id: 363, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 4,
        key: 'biologia',
        name: 'Biologia',
        topics: [
            {
                id: 40,
                name: 'Biologia - Tópico 1',
                subtopics: [
                    { id: 401, name: 'Subtópico 1' },
                    { id: 402, name: 'Subtópico 2' },
                    { id: 403, name: 'Subtópico 3' },
                ],
            },
            {
                id: 41,
                name: 'Biologia - Tópico 2',
                subtopics: [
                    { id: 411, name: 'Subtópico 1' },
                    { id: 412, name: 'Subtópico 2' },
                    { id: 413, name: 'Subtópico 3' },
                ],
            },
            {
                id: 42,
                name: 'Biologia - Tópico 3',
                subtopics: [
                    { id: 421, name: 'Subtópico 1' },
                    { id: 422, name: 'Subtópico 2' },
                    { id: 423, name: 'Subtópico 3' },
                ],
            },
            {
                id: 43,
                name: 'Biologia - Tópico 4',
                subtopics: [
                    { id: 431, name: 'Subtópico 1' },
                    { id: 432, name: 'Subtópico 2' },
                    { id: 433, name: 'Subtópico 3' },
                ],
            },
            {
                id: 44,
                name: 'Biologia - Tópico 5',
                subtopics: [
                    { id: 441, name: 'Subtópico 1' },
                    { id: 442, name: 'Subtópico 2' },
                    { id: 443, name: 'Subtópico 3' },
                ],
            },
            {
                id: 45,
                name: 'Biologia - Tópico 6',
                subtopics: [
                    { id: 451, name: 'Subtópico 1' },
                    { id: 452, name: 'Subtópico 2' },
                    { id: 453, name: 'Subtópico 3' },
                ],
            },
            {
                id: 46,
                name: 'Biologia - Tópico 7',
                subtopics: [
                    { id: 461, name: 'Subtópico 1' },
                    { id: 462, name: 'Subtópico 2' },
                    { id: 463, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 5,
        key: 'geografia',
        name: 'Geografia',
        topics: [
            {
                id: 50,
                name: 'Geografia - Tópico 1',
                subtopics: [
                    { id: 501, name: 'Subtópico 1' },
                    { id: 502, name: 'Subtópico 2' },
                    { id: 503, name: 'Subtópico 3' },
                ],
            },
            {
                id: 51,
                name: 'Geografia - Tópico 2',
                subtopics: [
                    { id: 511, name: 'Subtópico 1' },
                    { id: 512, name: 'Subtópico 2' },
                    { id: 513, name: 'Subtópico 3' },
                ],
            },
            {
                id: 52,
                name: 'Geografia - Tópico 3',
                subtopics: [
                    { id: 521, name: 'Subtópico 1' },
                    { id: 522, name: 'Subtópico 2' },
                    { id: 523, name: 'Subtópico 3' },
                ],
            },
            {
                id: 53,
                name: 'Geografia - Tópico 4',
                subtopics: [
                    { id: 531, name: 'Subtópico 1' },
                    { id: 532, name: 'Subtópico 2' },
                    { id: 533, name: 'Subtópico 3' },
                ],
            },
            {
                id: 54,
                name: 'Geografia - Tópico 5',
                subtopics: [
                    { id: 541, name: 'Subtópico 1' },
                    { id: 542, name: 'Subtópico 2' },
                    { id: 543, name: 'Subtópico 3' },
                ],
            },
            {
                id: 55,
                name: 'Geografia - Tópico 6',
                subtopics: [
                    { id: 551, name: 'Subtópico 1' },
                    { id: 552, name: 'Subtópico 2' },
                    { id: 553, name: 'Subtópico 3' },
                ],
            },
            {
                id: 56,
                name: 'Geografia - Tópico 7',
                subtopics: [
                    { id: 561, name: 'Subtópico 1' },
                    { id: 562, name: 'Subtópico 2' },
                    { id: 563, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 6,
        key: 'fisica',
        name: 'Física',
        topics: [
            {
                id: 60,
                name: 'Física - Tópico 1',
                subtopics: [
                    { id: 601, name: 'Subtópico 1' },
                    { id: 602, name: 'Subtópico 2' },
                    { id: 603, name: 'Subtópico 3' },
                ],
            },
            {
                id: 61,
                name: 'Física - Tópico 2',
                subtopics: [
                    { id: 611, name: 'Subtópico 1' },
                    { id: 612, name: 'Subtópico 2' },
                    { id: 613, name: 'Subtópico 3' },
                ],
            },
            {
                id: 62,
                name: 'Física - Tópico 3',
                subtopics: [
                    { id: 621, name: 'Subtópico 1' },
                    { id: 622, name: 'Subtópico 2' },
                    { id: 623, name: 'Subtópico 3' },
                ],
            },
            {
                id: 63,
                name: 'Física - Tópico 4',
                subtopics: [
                    { id: 631, name: 'Subtópico 1' },
                    { id: 632, name: 'Subtópico 2' },
                    { id: 633, name: 'Subtópico 3' },
                ],
            },
            {
                id: 64,
                name: 'Física - Tópico 5',
                subtopics: [
                    { id: 641, name: 'Subtópico 1' },
                    { id: 642, name: 'Subtópico 2' },
                    { id: 643, name: 'Subtópico 3' },
                ],
            },
            {
                id: 65,
                name: 'Física - Tópico 6',
                subtopics: [
                    { id: 651, name: 'Subtópico 1' },
                    { id: 652, name: 'Subtópico 2' },
                    { id: 653, name: 'Subtópico 3' },
                ],
            },
            {
                id: 66,
                name: 'Física - Tópico 7',
                subtopics: [
                    { id: 661, name: 'Subtópico 1' },
                    { id: 662, name: 'Subtópico 2' },
                    { id: 663, name: 'Subtópico 3' },
                ],
            },
        ],
    },
    {
        id: 7,
        key: 'quimica',
        name: 'Química',
        topics: [
            {
                id: 70,
                name: 'Química - Tópico 1',
                subtopics: [
                    { id: 701, name: 'Subtópico 1' },
                    { id: 702, name: 'Subtópico 2' },
                    { id: 703, name: 'Subtópico 3' },
                ],
            },
            {
                id: 71,
                name: 'Química - Tópico 2',
                subtopics: [
                    { id: 711, name: 'Subtópico 1' },
                    { id: 712, name: 'Subtópico 2' },
                    { id: 713, name: 'Subtópico 3' },
                ],
            },
            {
                id: 72,
                name: 'Química - Tópico 3',
                subtopics: [
                    { id: 721, name: 'Subtópico 1' },
                    { id: 722, name: 'Subtópico 2' },
                    { id: 723, name: 'Subtópico 3' },
                ],
            },
            {
                id: 73,
                name: 'Química - Tópico 4',
                subtopics: [
                    { id: 731, name: 'Subtópico 1' },
                    { id: 732, name: 'Subtópico 2' },
                    { id: 733, name: 'Subtópico 3' },
                ],
            },
            {
                id: 74,
                name: 'Química - Tópico 5',
                subtopics: [
                    { id: 741, name: 'Subtópico 1' },
                    { id: 742, name: 'Subtópico 2' },
                    { id: 743, name: 'Subtópico 3' },
                ],
            },
            {
                id: 75,
                name: 'Química - Tópico 6',
                subtopics: [
                    { id: 751, name: 'Subtópico 1' },
                    { id: 752, name: 'Subtópico 2' },
                    { id: 753, name: 'Subtópico 3' },
                ],
            },
            {
                id: 76,
                name: 'Química - Tópico 7',
                subtopics: [
                    { id: 161, name: 'Subtópico 1' },
                    { id: 162, name: 'Subtópico 2' },
                    { id: 163, name: 'Subtópico 3' },
                ],
            },
        ],
    },
];

/**
 * STUDENT SUBJECT AREAS
 */
const studentSubjectAreas = [
    {
        studentId: 1,
        items: subjectAreas,
    },
    {
        studentId: 2,
        items: subjectAreas,
    },
    {
        studentId: 3,
        items: subjectAreas,
    },
];

/**
 * STUDENTS
 */
const students = [
    { id: 1, name: 'Caio Gazola' },
    { id: 2, name: 'Filipe Mendes' },
    { id: 3, name: 'Arwen Undómiel' },
    { id: 4, name: 'Carminda Bonilha' },
    { id: 5, name: 'Conceição Torquato' },
    { id: 6, name: 'Cristiana Bahía' },
    { id: 7, name: 'Damião Varella' },
    { id: 8, name: 'Denise Macena' },
    { id: 9, name: 'Délio Bocaiúva' },
    { id: 10, name: 'Délio Valadares' },
    { id: 11, name: 'Ester Vaz' },
    { id: 12, name: 'Frederico Lousã' },
    { id: 13, name: 'Geraldo Miranda' },
    { id: 14, name: 'Godinho ou Godim Melo' },
    { id: 15, name: 'Horácio Fogaça' },
    { id: 16, name: 'Ilma Vellozo' },
    { id: 17, name: 'Isabel Avelar' },
    { id: 18, name: 'Judite Zarco' },
    { id: 19, name: 'Julieta Pasos' },
    { id: 20, name: 'Lucília Carlos' },
    { id: 21, name: 'Luzia Zalazar' },
    { id: 22, name: 'Miriam Villégas' },
    { id: 23, name: 'Noêmia Azeredo' },
    { id: 24, name: 'Quintino Gorjão' },
    { id: 25, name: 'Roberta Pedrozo' },
    { id: 26, name: 'Rosália Silva' },
    { id: 27, name: 'Rúben Pastana' },
    { id: 28, name: 'Siquenique Portella' },
    { id: 29, name: 'Uriel Acevedo' },
    { id: 30, name: 'Zita Varela' },
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
        ],
    },
    {
        id: 2,
        name: '7º',
        classes: [
            { id: 1, key: 'turmaA', name: 'Turma A' },
            { id: 2, key: 'turmaB', name: 'Turma B' },
            { id: 3, key: 'turmaC', name: 'Turma C' },
        ],
    },
    {
        id: 3,
        name: '8º',
        classes: [
            { id: 1, key: 'turmaA', name: 'Turma A' },
            { id: 2, key: 'turmaB', name: 'Turma B' },
            { id: 3, key: 'turmaC', name: 'Turma C' },
        ],
    },
    {
        id: 4,
        name: '9º',
        classes: [
            { id: 1, key: 'turmaA', name: 'Turma A' },
            { id: 2, key: 'turmaB', name: 'Turma B' },
            { id: 3, key: 'turmaC', name: 'Turma C' },
        ],
    },
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

/**
 * EXERCICE TYPES
 */
const exerciceTypes = [{ id: 1, name: 'Lista Física' }, { id: 2, name: 'Lista Sistema' }];

/**
 * QUESTION DATABASE TYPES
 */
const questionDatabaseTypes = [
    { id: 1, name: 'Da Escola' },
    { id: 2, name: 'De Provas Anteriores' },
    { id: 3, name: 'Do Sistema' },
];

/**
 * QUESTION GENERATION TYPES
 */
const questionGenerationTypes = [
    { id: 1, name: 'Diferente por Aluno' },
    { id: 2, name: 'Única para Todos' },
    { id: 3, name: 'Selecionar Questões' },
];

/**
 * QUESTIONS
 */
const questions = [
    { id: 1, name: '[Fácil] Question 1 ...', colorLevel: QUESTION_EASY_COLOR },
    { id: 2, name: '[Fácil] Question 2 ...', colorLevel: QUESTION_EASY_COLOR },
    { id: 3, name: '[Fácil] Question 3 ...', colorLevel: QUESTION_EASY_COLOR },
    { id: 4, name: '[Fácil] Question 4 ...', colorLevel: QUESTION_EASY_COLOR },
    { id: 5, name: '[Fácil] Question 5 ...', colorLevel: QUESTION_EASY_COLOR },
    { id: 6, name: '[Médio] Question 6 ...', colorLevel: QUESTION_MEDIUM_COLOR },
    { id: 7, name: '[Médio] Question 7 ...', colorLevel: QUESTION_MEDIUM_COLOR },
    { id: 8, name: '[Médio] Question 8 ...', colorLevel: QUESTION_MEDIUM_COLOR },
    { id: 9, name: '[Médio] Question 9 ...', colorLevel: QUESTION_MEDIUM_COLOR },
    { id: 10, name: '[Médio] Question 10 ...', colorLevel: QUESTION_MEDIUM_COLOR },
    { id: 11, name: '[Difícil] Question 11 ...', colorLevel: QUESTION_HARD_COLOR },
    { id: 12, name: '[Difícil] Question 12 ...', colorLevel: QUESTION_HARD_COLOR },
    { id: 13, name: '[Difícil] Question 13 ...', colorLevel: QUESTION_HARD_COLOR },
    { id: 14, name: '[Difícil] Question 14 ...', colorLevel: QUESTION_HARD_COLOR },
    { id: 15, name: '[Difícil] Question 15 ...', colorLevel: QUESTION_HARD_COLOR },
];

/**
 * PERIODS
 */
const periods = [
    { id: 1, name: '1º Bimestre' },
    { id: 2, name: '2º Bimestre' },
    { id: 3, name: '3º Bimestre' },
    { id: 4, name: '4º Bimestre' },
    { id: 5, name: '5º Bimestre' },
    { id: 6, name: '6º Bimestre' },
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
    exerciceTypes,
    questionDatabaseTypes,
    questionGenerationTypes,
    questions,
    teacherCalendar,
    periods,
    grades,
};
