// @flow
import React, { Component } from 'react';
import { Icon, Container } from 'native-base';
import { computed } from 'mobx';
import { observer } from 'mobx-react/native';
import { SectionList } from 'react-native';

import ActionButton from 'react-native-action-button';

import { Tarefa } from './../../models';

import getItemLayout from './../../lib/getItemLayout';

// Types
import type { Evento } from './../../models';

// Store
import rootStore from './../../stores';

// Components
import Header from './../../components/Header';
import EmptyScreen from './../../components/EmptyScreen';
import CalendarItem from './../../components/calendar/CalendarItem';
import CalendarWeek from './../../components/calendar/CalendarWeek';
import CalendarModal from './../../components/calendar/CalendarModal';
import LoadingModal from './../../components/LoadingModal';
import BubbleMenu from './../../components/BubbleMenu';

const emptyEventsImg = require('./../../img/calendar_empty.png');

@observer
export default class CalendarScreen extends Component {
    listRef: SectionList;

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

    leftPress = () => {
        this.props.navigation.navigate('DrawerOpen');
    };

    setRef(ref: SectionList) {
        this.listRef = ref;
        const hasSemanaAtual = !!rootStore.eventos.eventosSections[1];
        if (
            this.listRef &&
            typeof this.listRef.scrollToLocation === 'function' &&
            rootStore.user.canAddActivity &&
            hasSemanaAtual
        ) {
            this.listRef.scrollToLocation({
                sectionIndex: 1,
                itemIndex: 0,
            });
            this.listRef.recordInteraction();
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        const emptyScreen = (
          <EmptyScreen
            title="Ops! Nenhuma Atividade"
            text="Nenhuma atividade cadastrada para os próximos dias"
            image={emptyEventsImg}
          />
        );

        const renderItem = ({ item }) => <CalendarItem item={item} onPress={this.showModal} />;
        const renderSectionHeader = ({ section }) => <CalendarWeek label={section.title} />;

        return (
          <Container>
            <Header title="Agenda" leftIcon="menu" leftPress={this.leftPress} />
            <BubbleMenu />
            <CalendarModal navigate={this.props.navigation.navigate} onClose={this.hideModal} />
            <LoadingModal loading={rootStore.eventos.loading}>
              <SectionList
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                sections={rootStore.eventos.eventosSections}
                initialNumToRender={10}
                stickySectionHeadersEnabled
                ListEmptyComponent={emptyScreen}
                keyExtractor={ev => ev.id}
                getItemLayout={getItemLayout({
                    getItemHeight: () => 70,
                    getSectionHeaderHeight: () => 38,
                })}
                ref={ref => this.setRef(ref)}
              />
            </LoadingModal>
            {rootStore.user.canAddActivity ? <Fab navigate={navigate} /> : null}
          </Container>
        );
    }
}

function Fab({ navigate }) {
    const items = [Tarefa.tipos.PROVA, Tarefa.tipos.TRABALHO, Tarefa.tipos.EXERCICIO].map(tipo => ({
        buttonColor: '#1C7FE2',
        title: Tarefa.getTarefaLabel(tipo),
        onPress: () => navigate('TarefasScreen', { tipo }),
    }));

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
