// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Separator, Text } from 'native-base';

import type { Evento } from './../../models';
// Components
import CalendarItem from './CalendarItem';

export default class CalendarWeek extends Component {
    props: {
        onPress?: Evento => void,
        items?: Array<Evento>,
        label?: string,
    };

    static defaultProps = {
        onPress: (evento) => {
            console.warn('', evento); // eslint-disable-line no-console
        },
        items: [],
        label: '',
    };

    render() {
        const { items, label, onPress } = this.props;
        if (!Array.isArray(items)) return null;
        return (
          <View>
            <Separator>
              <Text>
                {label}
              </Text>
            </Separator>
            {items.map(item => <CalendarItem key={item.id} item={item} onPress={onPress} />)}
          </View>
        );
    }
}
