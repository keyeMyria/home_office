import React from 'react';
import { observable } from 'mobx';

import VisaoGeral from '../VisaoGeral';
import Mensagens from '../Mensagens';
import Historico from '../Historico';
import CargaExercicios from '../CargaExercicios';

import Agenda from '../Agenda';
import Notas from '../Notas';
import Alertas from '../Alertas';
import Exercicios from '../Exercicios';
import Planejamento from '../Planejamento';

import * as MOCK from '../mock';

class AppStore {

  @observable drawer = {};
  @observable currentPage = {};
  @observable currentVisaoGeralPage = {};
  @observable visaoGeralFooterMenus = {};

  @observable usuario = {};
  @observable menu = {};
  @observable filhos = [];
  @observable filhoSelecionado = {};
  @observable agendas = [];
  @observable agendaSemanaAtual = {};
  @observable agendaProximaSemana = {};
  @observable alertas = {};

  // TODO: Colcar para selecionar pais diferentes por Id
  selecionarUsuarioPai() {
    this.usuario = MOCK.usuarioPai;
    this.menu = MOCK.menu;
    this.filhos = MOCK.filhos;

    this.selecionarFilho(1);
  }

  selecionarFilho(id) {

    this.filhoSelecionado = this.filhos.filter(filho => filho.id === id)[0];

    const agendaSemanaAtual = MOCK.agendaSemanaAtual.filter(item => item.idFilho === id)[0];
    this.agendaSemanaAtual = agendaSemanaAtual ? agendaSemanaAtual.agenda : {};

    const agendaProximaSemana = MOCK.agendaProximaSemana.filter(item => item.idFilho === id)[0];
    this.agendaProximaSemana = agendaProximaSemana ? agendaProximaSemana.agenda : {};

    const alertasFilho = MOCK.alertas.filter(item => item.idFilho === id)[0];
    this.alertas = alertasFilho ? alertasFilho.alertas : [];

    const visaoGeralFooterMenus = MOCK.visaoGeralFooterMenus.filter(item => item.idFilho === id)[0];
    this.visaoGeralFooterMenus = visaoGeralFooterMenus ? visaoGeralFooterMenus.menus : [];
  }

  /**
   * Navigation
   */

  setDrawer(drawer) {
    this.drawer = drawer;
  }

  openDrawer() {
    if (this.drawer && this.drawer._root) {
      this.drawer._root.open();
    }
  }

  closeDrawer() {
    if (this.drawer && this.drawer._root) {
      this.drawer._root.close();
    }
  }

  navigate(index) {
    switch (index) {
      case 0:
        this.currentPage = <VisaoGeral />;
        break;
      case 1:
        this.currentPage = <Mensagens title="Mensagens" />;
        break;
      case 2:
        this.currentPage = <Historico title="Histórico" />;
        break;
      case 3:
        this.currentPage = <CargaExercicios title="Exercícios" />;
        break;
    }
    this.closeDrawer();
  }

  navigateVisaoGeralPage(index) {
    switch (index) {
      case 0:
        this.currentVisaoGeralPage = <Agenda title="Agenda" />;
        break;
      case 1:
        this.currentVisaoGeralPage = <Notas title="Notas" />;
        break;
      case 2:
        this.currentVisaoGeralPage = <Alertas title="Alertas" />;
        break;
      case 3:
        this.currentVisaoGeralPage = <Exercicios title="Exercícios" />;
        break;
      case 4:
        this.currentVisaoGeralPage = <Planejamento title="Planejar" />;
        break;
    }
    this.currentVisaoGeralPage.index = index;
  }
}

export default new AppStore();