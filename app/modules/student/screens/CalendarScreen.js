import React, { Component } from 'react';
import { List } from 'native-base';

// Store
import { observable, action } from 'mobx';
import { observer } from 'mobx-react/native';
import store from '../../../store';
import { eventosStore } from '../../../store';

// Components
import ScreenShell from '../../../components/ScreenShell';
import CalendarWeek from '../../../components/calendar/CalendarWeek';
import CalendarModal from '../../../components/calendar/CalendarModal';

@observer
export default class CalendarScreen extends Component {
    @observable
    state = {
        item: {},
        visible: false,
    };

    constructor(props) {
        super(props);
        store.selectStudent(1);
    }

    @action.bound
    showModal(item) {
        if (!item) return;
        this.state.item = item;
        this.state.visible = true;
    }

    @action.bound
    hideModal() {
        this.state.item = {};
        this.state.visible = false;
    }

    render() {
        const { navigate } = this.props.navigation;
        const currentWeekItems = eventosStore;
        // const nextWeekItems = store.studentSelected.calendar.nextWeekItems;

        return (
          <ScreenShell title="Agenda" navigate={navigate} padder={false}>
            <CalendarModal state={this.state} onClose={this.hideModal} />
            <List agendaList>
              <CalendarWeek
                label="Semana Atual"
                items={currentWeekItems}
                onPress={this.showModal}
              />
              {/* <CalendarWeek
                label="Próxima Semana"
                items={nextWeekItems}
                onPress={this.showModal}
              />*/}
            </List>
          </ScreenShell>
        );
    }
}
