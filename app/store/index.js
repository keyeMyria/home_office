import React from 'react';
import { observable } from 'mobx';

import Agenda from '../Agenda';
import Notas from '../Notas';
import Alertas from '../Alertas';
import Exercicios from '../Exercicios';
import CargaMinima from '../CargaMinima';

import * as MOCK from '../mock';

class AppStore {

  // Naviagation
  @observable currentVisaoGeralPage = {};

  // Estaticos
  @observable menu = MOCK.menu;
  @observable usuario = MOCK.usuarioPai;
  @observable filhos = MOCK.filhos;
  @observable materias = MOCK.materias;
  @observable temposCargaExercicio = MOCK.temposCargaExercicio;
  @observable alertas = MOCK.alertas;
  @observable agendaSemanaAtual = MOCK.agendaSemanaAtual;
  @observable agendaProximaSemana = MOCK.agendaProximaSemana;
  @observable visaoGeralFooterMenus = MOCK.visaoGeralFooterMenus;
  @observable alunos = MOCK.alunos;
  @observable turmas = MOCK.turmas;

  // Dinamicos
  @observable filhoSelecionado = {};
  @observable filhoVisaoGeralMenus = [];
  @observable filhoAgendaSemanaAtual = [];
  @observable filhoAgendaProximaSemana = [];
  @observable filhoAlertas = [];
  @observable filhoMaterias = [];
  @observable filhoCargaExercicio = {};
  @observable cargaExercicios = [];

  @observable formChanged = false;

  @observable faltas = [];

  // TODO: Colcar para selecionar pais diferentes por Id
  selecionarUsuarioPai() {
    this.selecionarFilho(1);
  }

  selecionarFilho(id) {
    this.filhoSelecionado = this.filhos.filter(filho => filho.id === id)[0];
    this.filhoAgendaSemanaAtual = this.agendaSemanaAtual.filter(item => item.idFilho === id)[0];
    this.filhoAgendaProximaSemana = this.agendaProximaSemana.filter(item => item.idFilho === id)[0];
    this.filhoAlertas = this.alertas.filter(item => item.idFilho === id)[0];
    this.filhoVisaoGeralMenus = this.visaoGeralFooterMenus.filter(item => item.idFilho === id)[0];
    this.filhoMaterias = this.materias.filter(item => item.idFilho === id)[0];

    this.filhoCargaExercicio = this.cargaExercicios.length > 0 ? this.cargaExercicios.filter(item => item.idFilho === id)[0] || {} : {};
    this.formChanged = true;
  }

  toogleFormChanged() {
    this.formChanged = !this.formChanged;
  }

  /**
   * Carga minima de exercicios
   */

  salvarCargaMinimaFilho(values) {
    values.idFilho = this.filhoSelecionado.id;
    this.filhoCargaExercicio = values;
    if (this.cargaExercicios.length > 0) {
      this.cargaExercicios = this.cargaExercicios.filter(item => item.idFilho !== this.filhoSelecionado.id);
    }
    this.cargaExercicios.push(this.filhoCargaExercicio);
  }

  /**
   * Faltas
   */

  marcarFaltaAluno(idAluno) {
    this.faltas.push(idAluno);
  }

  removerFaltaAluno(idAluno) {
    this.faltas = this.faltas.filter(id => id !== idAluno);
  }

  removerFaltaTodosAlunos() {
    this.faltas = [];
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
        this.currentVisaoGeralPage = <CargaMinima title="Planejar" />;
        break;
    }
    this.currentVisaoGeralPage.index = index;
  }
}

export default new AppStore();