// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

import CalendarItem from './CalendarItem';
import CONFIG from './../../../config';

export type CalendarDayProps = {
    items: Array<any>,
    day: string,
    onPress: any => void,
};

// Components
export default class CalendarDay extends PureComponent {
    props: CalendarDayProps;

    static defaultProps = {
        items: [],
        day: 'day',
        groupByDay: false,
    };

    renderWithoutDay() {
        const { items, onPress } = this.props;
        return (
          <View style={styles.eventContainer}>
            {items.map(i => <CalendarItem key={i.id} item={i} onPress={onPress} />)}
          </View>
        );
    }

    renderWithDay() {
        const { day } = this.props;
        const momentDate = moment(day);

        return (
          <View style={styles.container}>
            <View style={styles.dayNameView}>
              <Text style={styles.dayText}>{momentDate.format('DD')}</Text>
              <Text style={styles.weekDayText}>{momentDate.format('ddd')}</Text>
            </View>
            {this.renderWithoutDay()}
          </View>
        );
    }

    render() {
        if (CONFIG.AGENDA.groupByDay) {
            return this.renderWithDay();
        }
        return this.renderWithoutDay();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    dayNameView: {
        width: 64,
        alignItems: 'center',
    },
    eventContainer: {
        flex: 1,
    },
    dayText: {
        fontSize: 28,
        fontFamily: 'Roboto',
    },
    weekDayText: {
        fontSize: 14,
        fontFamily: 'Roboto',
    },
});
