// @flow
import React, { Component } from 'react';
import { List, Icon } from 'native-base';
import { computed } from 'mobx';
import { observer } from 'mobx-react/native';

import ActionButton from 'react-native-action-button';

import { isThisWeek, isNextWeek, isBeforeThisWeek } from './../../lib/dates';

// Types
import type { Evento } from './../../models';

// Store
import rootStore from './../../stores';

// Components
import ScreenShell from './../../components/ScreenShell';
import EmptyScreen from './../../components/EmptyScreen';
import CalendarWeek from './../../components/calendar/CalendarWeek';
import CalendarModal from './../../components/calendar/CalendarModal';
import BubbleMenu from './../../components/BubbleMenu';

const emptyEventsImg = require('./../../img/calendar_empty.png');

@observer
export default class CalendarScreen extends Component {
    showModal = (ev: Evento) => rootStore.eventos.selectEvento(ev);
    hideModal = () => rootStore.eventos.selectEvento();

    @computed
    get eventos(): Array<Evento> {
        if (rootStore.user.isProfessor || rootStore.user.isDiretor) {
            const anoSelected = rootStore.professor.anoSelectedId;
            if (anoSelected) {
                return rootStore.eventos.eventos.filter(ev => ev.turma.ano.id === anoSelected);
            }
        }
        return rootStore.eventos.eventos;
    }

    renderWeek(titulo: string, filter: Date => boolean) {
        const items = this.eventos.filter(ev => filter(ev.fim));
        if (!items.length) return null;
        return <CalendarWeek label={titulo} items={items} onPress={this.showModal} />;
    }

    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Agenda',
            padder: false,
            loading: rootStore.eventos.loading && !rootStore.eventos.eventos.length,
            fab: rootStore.user.canAddActivity ? Fab : null,
            refreshControl: {
                refreshing: rootStore.eventos.loading,
                onRefresh: () => rootStore.eventos.refresh(),
            },
        };
    }

    render() {
        const semanasAnteriores = (rootStore.user.isProfessor || rootStore.user.isDiretor) && this.renderWeek('Semanas Anteriores', isBeforeThisWeek);
        const semanaAtual = this.renderWeek('Semanas Atual', isThisWeek);
        const proximaSemana = this.renderWeek('Próxima Semana', isNextWeek);

        const hasEventos = !!(semanasAnteriores || semanaAtual || proximaSemana);

        const content = hasEventos ? (
          <List agendaList>
            {semanasAnteriores}
            {semanaAtual}
            {proximaSemana}
          </List>
        ) : (
          <EmptyScreen
            title="Ops! Nenhuma Atividade"
            text="Nenhuma atividade cadastrada para os próximos dias"
            image={emptyEventsImg}
          />
        );

        return (
          <ScreenShell {...this.screenShellProps} emptyScreen={!hasEventos}>
            <BubbleMenu />
            <CalendarModal navigate={this.props.navigation.navigate} onClose={this.hideModal} />
            {content}
          </ScreenShell>
        );
    }
}

function Fab({ navigate }) {
    const goTo = name => () => navigate(name);

    const items = [
        { buttonColor: '#1C7FE2', title: 'Prova', onPress: goTo('ProvasScreen') },
        { buttonColor: '#1C7FE2', title: 'Trabalho', onPress: goTo('HomeworkScreen') },
        { buttonColor: '#1C7FE2', title: 'Dever', onPress: goTo('ExerciciosScreen') },
    ];

    const iconStyle = { color: '#fff', fontSize: 24 };

    return (
      <ActionButton buttonColor="rgba(231,76,60,1)" bgColor="rgba(255,255,255,0.75)">
        <ActionButton.Item {...items[0]}>
          <Icon name="assignment-turned-in" style={iconStyle} />
        </ActionButton.Item>
        <ActionButton.Item {...items[1]}>
          <Icon name="library-books" style={iconStyle} />
        </ActionButton.Item>
        <ActionButton.Item {...items[2]}>
          <Icon name="tune" style={iconStyle} />
        </ActionButton.Item>
      </ActionButton>
    );
}
