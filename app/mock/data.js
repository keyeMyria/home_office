import React from 'react';

import Agenda from '../Agenda';
import Notas from '../Notas';
import Alertas from '../Alertas';
import Exercicios from '../Exercicios';
import Planejamento from '../Planejamento';

export default {
  user: {
    name: 'Maycon Sousa',
    email: 'mayconfsousa@gmail.com'
  },
  menus: [
    {
      items: [
        'FUNCIONALIDADES',
        'Visão Geral',
        'Envio de Mensagens',
        'Histórico Detalhado',
        'Análise de Carga de Exercícios Realizada'
      ]
    },
    {
      items: [
        'OUTROS',
        'Dúvidas',
        'Fale Conosco',
        'Reportar Erros',
        'Sobre'
      ]
    }
  ],
  visaoGeral: {
    routes: [
      {
        index: 0,
        component: <Agenda />,
        title: 'Agenda'
      },
      {
        index: 1,
        component: <Notas />,
        title: 'Notas'
      },
      {
        index: 2,
        component: <Alertas />,
        title: 'Alertas'
      },
      {
        index: 3,
        component: <Exercicios />,
        title: 'Exercícios'
      },
      {
        index: 4,
        component: <Planejamento />,
        title: 'Planejamento'
      }
    ],
    footerMenus: [
      {
        icon: 'calendar-o',
        text: 'Agenda'
      },
      {
        icon: 'bar-chart-o',
        text: 'Notas'
      },
      {
        icon: 'bell-o',
        text: 'Alertas'
      },
      {
        icon: 'file-text-o',
        text: 'Exercícios'
      },
      {
        icon: 'sliders',
        text: 'Planejamento'
      }
    ]
  },
  filhos: [
    {
      index: 0,
      nome: 'Caio'
    },
    {
      index: 1,
      nome: 'Filipe'
    },
    {
      index: 2,
      nome: 'Maria'
    }
  ],
  agendaSemanaAtual: {
    label: 'Semana Atual',
    items: [
      {
        tipo: 'E.E.',
        corTipo: '#64B5F6',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'E.P.',
        corTipo: '#FFF176',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'E.P.',
        corTipo: '#FFF176',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'P.',
        corTipo: '#E57373',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'P.',
        corTipo: '#E57373',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      }
    ]
  },
  agendaProximaSemana: {
    label: 'Próxima Semana',
    items: [
      {
        tipo: 'E.E.',
        corTipo: '#64B5F6',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'E.P.',
        corTipo: '#FFF176',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'E.P.',
        corTipo: '#FFF176',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'P.',
        corTipo: '#E57373',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      },
      {
        tipo: 'P.',
        corTipo: '#E57373',
        diaSemana: 'Seg.',
        diaMes: '13/mai',
        informacao: 'Exercícios da Escola - Lista de Português (7 exer. /14h30)'
      }
    ]
  }
};