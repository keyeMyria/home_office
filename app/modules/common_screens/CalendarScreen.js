// @flow
import React, { Component } from 'react';
import { List, Icon } from 'native-base';
import { observer } from 'mobx-react/native';

import ActionButton from 'react-native-action-button';

import { isThisWeek, isNextWeek, isBeforeThisWeek } from './../../lib/dates';

// Types
import type { Evento } from './../../models';

// Store
import eventoStore from './../../stores/EventosStore';
import userStore from './../../stores/UserStore';

// Components
import ScreenShell from './../../components/ScreenShell';
import CalendarWeek from './../../components/calendar/CalendarWeek';
import CalendarModal from './../../components/calendar/CalendarModal';
import BubbleMenu from './../../components/BubbleMenu';

@observer
export default class CalendarScreen extends Component {
    showModal = (ev: Evento) => eventoStore.selectEvento(ev);
    hideModal = () => eventoStore.selectEvento();

    renderWeek(titulo: string, filter: Date => boolean) {
        const items = eventoStore.eventos.filter(ev => filter(ev.fim));
        if (!items.length) return null;
        return <CalendarWeek label={titulo} items={items} onPress={this.showModal} />;
    }

    get screenShellProps(): Object {
        const { navigate } = this.props.navigation;
        return {
            navigate,
            title: 'Agenda',
            padder: false,
            loading: eventoStore.loading,
            fab: userStore.role === 'PROFESSOR' ? Fab : null,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <BubbleMenu />
            <CalendarModal navigate={this.props.navigation.navigate} onClose={this.hideModal} />
            <List agendaList>
              {this.renderWeek('Semanas Anteriores', isBeforeThisWeek)}
              {this.renderWeek('Semanas Atual', isThisWeek)}
              {this.renderWeek('Próxima Semana', isNextWeek)}
            </List>
          </ScreenShell>
        );
    }
}

function Fab({ navigate }) {
    const goTo = name => () => navigate(name);

    const items = [
        { buttonColor: '#1C7FE2', title: 'Prova', onPress: goTo('ProvasScreen') },
        { buttonColor: '#1C7FE2', title: 'Trabalho', onPress: goTo('HomeworkScreen') },
        { buttonColor: '#1C7FE2', title: 'Exercicio', onPress: () => {} },
    ];

    const iconStyle = { color: '#fff', fontSize: 24 };

    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
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
