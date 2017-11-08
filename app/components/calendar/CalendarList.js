// @flow
/* eslint no-return-assign:0, no-mixed-operators:0 */
import React, { PureComponent } from 'react';
import { Icon, Button, Text } from 'native-base';
import { SectionList, View } from 'react-native';
import { autorun } from 'mobx';
import _ from 'lodash';
import moment from 'moment';
import getItemLayout from './../../lib/getItemLayout';

import eventoStore from './../../stores/EventosStore';
import userStore from './../../stores/UserStore';

// Components
import EmptyScreen from './../EmptyScreen';

import CalendarDay from './CalendarDay';
import CalendarWeek from './CalendarWeek';

const emptyEventsImg = require('./../../img/calendar_empty.png');

type Props = {
    data: Array<any>,
    onItemPress: any => any,
    backFourWeeks: () => any,
};

export default class CalendarScreen extends PureComponent {
    disposer: () => void;
    list: SectionList<*>;
    props: Props;

    state = {
        loading: false,
    };

    static defaultProps = {
        data: [],
        onItemPress: () => {},
        backFourWeeks: () => {},
    };

    itemLayout = getItemLayout({
        getItemHeight: rowData => rowData.items.length * 78 + 24,
        getSectionHeaderHeight: () => 55,
        getListHeaderHeight: () => 60,
    });

    get emptyScreen(): * {
        return (
          <EmptyScreen
            title="Ops! Nenhuma Atividade"
            text="Nenhuma atividade cadastrada para os próximos dias"
            image={emptyEventsImg}
          />
        );
    }
    componentWillMount() {
        this.disposer = autorun(() => {
            if (eventoStore.refreshIndicator !== this.state.loading) {
                this.setState({ loading: eventoStore.refreshIndicator });
            }
        });
    }

    componentWillUnmount() {
        this.disposer();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps !== this.props) {
            const prev = prevProps.data.length;
            const current = this.props.data.length;
            if (prev === 0 || current === 0) return;
            this.list.scrollToLocation({
                animated: false,
                itemIndex: 0,
                sectionIndex: current - prev,
                viewPosition: 0,
            });
            this.list.recordInteraction();
        }
    }

    get initialIndex(): number {
        const thisWeek = moment().week();
        const thisWeekIndex = _.findIndex(this.props.data, s => s.week === thisWeek);
        if (thisWeekIndex !== -1) {
            let initialIndex = userStore.canAddActivity ? 1 : 0;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < thisWeekIndex; i++) {
                initialIndex += 1 + this.props.data[i].data.length;
            }
            return initialIndex;
        }
        return 0;
    }

    renderItem = ({ item }: { item: any }) => (
      <CalendarDay day={item.dia} items={item.items} onPress={this.props.onItemPress} />
    );

    renderSectionHeader = ({ section }: { section: any }) => <CalendarWeek label={section.title} />;

    renderTop = () => (
      <View style={{ padding: 8, paddingHorizontal: 16, justifyContent: 'center', flex: 1 }}>
        <Button block onPress={this.props.backFourWeeks} style={{ borderRadius: 35 }}>
          <Icon name="keyboard-arrow-up" />
          <Text>Voltar 4 Semanas</Text>
        </Button>
      </View>
    );

    render() {
        const initialIndex = this.initialIndex;
        const isProfessor = userStore.canAddActivity;

        return (
          <SectionList
            ref={ref => (this.list = ref)}
            style={{ zIndex: -1 }}
            renderItem={this.renderItem}
            sections={this.props.data}
            onRefresh={isProfessor ? this.props.backFourWeeks : undefined}
            stickySectionHeadersEnabled
            initialScrollIndex={initialIndex}
            refreshing={this.state.loading}
            ListEmptyComponent={this.emptyScreen}
            keyExtractor={day => day.dia}
            renderSectionHeader={this.renderSectionHeader}
            getItemLayout={this.itemLayout}
            ListHeaderComponent={isProfessor ? this.renderTop : undefined}
          />
        );
    }
}
