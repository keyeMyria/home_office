// @flow
/* eslint no-return-assign:0, no-mixed-operators:0 */
import React, { PureComponent } from 'react';
import { Icon, Button, Text } from 'native-base';
import { SectionList, View } from 'react-native';
import { autorun } from 'mobx';
import getItemLayout from './../../lib/getItemLayout';

import eventoStore from './../../stores/EventosStore';

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
        if (eventoStore.currentWeek === eventoStore.prevWeek) {
            if (this.props.data.length === 4) {
                return this.props.data.reduce((p, c, i, a) => {
                    if (i > a.length - 3) return p;
                    return p + 1 + c.data.length;
                }, 1);
            }
            return this.props.data.reduce((p, c) => p + 1 + c.data.length, 0);
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
        return (
          <SectionList
            ref={ref => (this.list = ref)}
            style={{ zIndex: -1 }}
            renderItem={this.renderItem}
            sections={this.props.data}
            onRefresh={this.props.backFourWeeks}
            stickySectionHeadersEnabled
            initialScrollIndex={initialIndex}
            refreshing={this.state.loading}
            ListEmptyComponent={this.emptyScreen}
            keyExtractor={day => day.dia}
            renderSectionHeader={this.renderSectionHeader}
            getItemLayout={this.itemLayout}
            ListHeaderComponent={this.renderTop}
          />
        );
    }
}
