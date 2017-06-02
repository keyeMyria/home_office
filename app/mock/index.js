const usuarioPai = {
  name: 'Maycon Sousa',
  email: 'mayconfsousa@gmail.com'
};

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
          iconName: 'chat'
        },
        {
          label: 'Histórico',
          iconName: 'history'
        },
        {
          label: 'Carga de Exercícios',
          iconName: 'book'
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

const visaoGeralFooterMenus = [
  {
    idFilho: 1,
    menus: [
      {
        label: 'Agenda',
        iconName: 'today'
      },
      {
        label: 'Notas',
        iconName: 'insert-chart'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 3
      },
      {
        label: 'Exercícios',
        iconName: 'insert-drive-file'
      },
      {
        label: 'Planejar',
        iconName: 'format-list-numbered'
      }
    ]
  },
  {
    idFilho: 2,
    menus: [
      {
        label: 'Agenda',
        iconName: 'today'
      },
      {
        label: 'Notas',
        iconName: 'insert-chart'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 1
      },
      {
        label: 'Exercícios',
        iconName: 'insert-drive-file'
      },
      {
        label: 'Planejar',
        iconName: 'format-list-numbered'
      }
    ]
  },
  {
    idFilho: 3,
    menus: [
      {
        label: 'Agenda',
        iconName: 'today'
      },
      {
        label: 'Notas',
        iconName: 'insert-chart'
      },
      {
        label: 'Alertas',
        iconName: 'notifications',
        badge: 2
      },
      {
        label: 'Exercícios',
        iconName: 'insert-drive-file'
      },
      {
        label: 'Planejar',
        iconName: 'format-list-numbered'
      }
    ]
  }
];

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

const alertas = [
  {
    idFilho: 1,
    alertas: [
      {
        title: 'Mensagem 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 5',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 6',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 7',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      }
    ]
  },
  {
    idFilho: 2,
    alertas: [
      {
        title: 'Mensagem 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 5',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      }
    ]
  },
  {
    idFilho: 3,
    alertas: [
      {
        title: 'Mensagem 1',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 2',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: false
      },
      {
        title: 'Mensagem 3',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      },
      {
        title: 'Mensagem 4',
        message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla',
        readed: true
      }
    ]
  }
];

export {
  usuarioPai,
  filhos,
  menu,
  visaoGeralFooterMenus,
  agendaSemanaAtual,
  agendaProximaSemana,
  alertas,
};