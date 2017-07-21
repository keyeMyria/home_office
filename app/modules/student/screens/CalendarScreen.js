// @flow
import React, { Component } from 'react';
import { List } from 'native-base';
import { observer } from 'mobx-react/native';

import { isThisWeek, isNextWeek, isBeforeThisWeek } from './../../../lib/dates';

// Types
import type { Evento } from './../../../models';

// Store
import eventoStore from '../../../stores/EventosStore';

// Components
import ScreenShell from '../../../components/ScreenShell';
import CalendarWeek from '../../../components/calendar/CalendarWeek';
import CalendarModal from '../../../components/calendar/CalendarModal';

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
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <CalendarModal onClose={this.hideModal} />
            <List agendaList>
              {this.renderWeek('Semanas Anteriores', isBeforeThisWeek)}
              {this.renderWeek('Semanas Atual', isThisWeek)}
              {this.renderWeek('Próxima Semana', isNextWeek)}
            </List>
          </ScreenShell>
        );
    }
}
