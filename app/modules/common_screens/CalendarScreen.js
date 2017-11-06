// @flow
import React, { Component } from 'react';
import { Container } from 'native-base';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';

import Header from './../../components/Header';

// Components
import LoadingModal from '../../components/LoadingModal';
import BubbleMenu from '../../components/BubbleMenu';

import userStore from './../../stores/UserStore';

// Stores
import eventoStore from './../../stores/EventosStore';
import CalendarModal from './../../components/calendar/CalendarModal';
import CalendarList from './../../components/calendar/CalendarList';
import AgendaFab from './../../components/calendar/AgendaFab';

@observer
export default class CalendarScreen extends Component {
    listRef: any;
    @observable showCalendar = false;

    showModal = (ev: any) => eventoStore.selectEvento(ev);
    hideModal = () => eventoStore.selectEvento();

    leftPress = () => {
        this.props.navigation.navigate('DrawerOpen');
    };

    backFourWeeks = () => {
        eventoStore.fetchEventos(eventoStore.currentWeek - 4, false, true);
    };

    refresh= () => {
        eventoStore.refresh();
    }

    render() {
        return (
          <Container style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
            <Header
              title="Agenda"
              leftIcon="menu"
              leftPress={this.leftPress}
              rightIcon="refresh"
              rightPress={this.refresh}
            />
            <BubbleMenu />
            <CalendarModal navigate={this.props.navigation.navigate} onClose={this.hideModal} />
            <LoadingModal loading={eventoStore.loading}>
              <CalendarList
                backFourWeeks={this.backFourWeeks}
                data={eventoStore.eventos.slice()}
                onItemPress={this.showModal}
              />
            </LoadingModal>
            {userStore.canAddActivity && <AgendaFab />}
          </Container>
        );
    }
}
