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
        {
          label: 'FUNCIONALIDADES'
        },
        {
          index: 0,
          label: 'Visão Geral',
          iconName: 'home'
        },
        {
          index: 1,
          label: 'Mensagens',
          iconName: 'comments'
        },
        {
          index: 2,
          label: 'Histórico',
          iconName: 'history'
        },
        {
          index: 3,
          label: 'Carga de Exercícios',
          iconName: 'book'
        },
      ]
    },
    {
      items: [
        {
          label: 'OUTROS'
        },
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
        title: 'Planejar'
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
        text: 'Planejar'
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
  },
  alertas: [
    {
      title: 'Mensagem 1',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 2',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 3',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 4',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 5',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 6',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    },
    {
      title: 'Mensagem 7',
      message: 'Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla'
    }
  ]
};