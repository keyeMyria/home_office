// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Text } from 'native-base';

import CONFIG from './../../../config';
import rootStore from './../../stores';
import type { Evento } from '../../models';

const Touch = Platform.select({ ios: TouchableOpacity, android: TouchableNativeFeedback });

export default class CalendarItem extends PureComponent {
    props: {
        item: Evento,
        onPress: Evento => void,
    };

    static defaultProps = {
        // $FlowFixMe
        onPress: () => {},
    };

    onPress = () => {
        this.props.onPress(this.props.item);
    };

    getInfoText() {
        if (rootStore.user.canAddActivity) {
            return `${this.props.item.turmaAno} - ${this.props.item.infoText}`;
        }
        return this.props.item.infoText;
    }

    render() {
        const { item } = this.props;

        const infoText = this.getInfoText();

        const textColor = CONFIG.AGENDA.tipoTextColorMap[item.tarefa.tipo];
        const labelColor = CONFIG.AGENDA.tipoColorMap[item.tarefa.tipo];

        return (
          <Touch onPress={this.onPress}>
            <View style={styles.grid}>
              <View style={[styles.labelCollumn, { backgroundColor: labelColor }]}>
                <Text style={{ ...styles.gridRowText, color: textColor }}>
                  {item.tarefa.abbr}
                </Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={styles.grid}>
                  <View style={styles.data}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>
                      {item.dayOfWeek}
                    </Text>
                    <Text style={styles.gridRowText}>{item.fim.format('DD/MMM')}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={styles.gridRowText}>{infoText}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
              </View>
            </View>
          </Touch>
        );
    }
}

// Styles
const styles = {
    grid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        height: 70,
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        alignSelf: 'stretch',
    },
    labelCollumn: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    gridColumn: {
        alignItems: 'center',
    },
    gridColumnAlignLeft: {
        alignItems: 'flex-start',
    },
    gridRowText: {
        fontSize: 14,
    },
    tipoAbbrCol: function tipoAbbrCol(cor: string) {
        return {
            ...this.gridColumn,
            backgroundColor: cor,
            width: 30,
        };
    },
    data: {
        flex: 0,
        flexDirection: 'column',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 12,
        paddingRight: 0,
    },
};
