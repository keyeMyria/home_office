// @flow
import React, { PureComponent } from 'react';
import {
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import CONFIG from './../../../config';

const Touch = Platform.select({ ios: TouchableOpacity, android: TouchableNativeFeedback });

type Props = {
    item: any,
    onPress: any => void,
};

export default class CalendarItem extends PureComponent {
    props: Props;

    static defaultProps = {
        onPress: () => {},
    };

    onPress = () => {
        this.props.onPress(this.props.item);
    };

    /**
     * retorna a cor do evento
     */
    get labelColor(): string {
        return CONFIG.AGENDA.tipoColorMap[this.props.item.tipo];
    }

    /**
     * Renderiza o label colorido do evento
     */
    renderLabel() {
        return <View style={[styles.labelCollumn, { backgroundColor: this.labelColor }]} />;
    }

    renderDate() {
        if (CONFIG.AGENDA.groupByDay) {
            return null;
        }
        const { item } = this.props;
        const mDate = moment(item.fim);
        const dayNumber = mDate.format('DD');
        const weekDay = mDate.format('ddd');

        return (
          <View style={styles.dateContainerStyle}>
            <Text style={styles.dateWeekText}>{weekDay}</Text>
            <Text style={styles.dateDayText}>{dayNumber}</Text>
          </View>
        );
    }

    /** ,
     * Renderiza o texto da esquerda
     */
    renderLefttext() {
        const item = this.props.item;
        return (
          <View style={styles.leftTextContainer}>
            <Text style={styles.styleTitulo} numberOfLines={1} ellipsizeMode="tail">
              <Text style={{ color: this.labelColor }}>{CONFIG.AGENDA.tipoNameMap[item.tipo]}</Text>
              {` de ${_.capitalize(item.disciplina)}`}
            </Text>
            <Text style={styles.gridRowText} numberOfLines={1} ellipsizeMode="tail">
              {_.capitalize(item.titulo_tarefa)}
            </Text>
          </View>
        );
    }

    /**
     * Renderiza o texto à direita
     */
    renderRightText() {
        const item = this.props.item;
        return (
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>{item.turma_e_ano}</Text>
            <Text style={styles.rightText}>{item.duracao || item.tarefa_valor}</Text>
          </View>
        );
    }

    render() {
        return (
          <Touch onPress={this.onPress}>
            <View style={styles.container}>
              {this.renderLabel()}
              <View style={styles.contentContainer}>
                <View style={styles.grid}>
                  {this.renderDate()}
                  {this.renderLefttext()}
                  {this.renderRightText()}
                </View>
              </View>
            </View>
          </Touch>
        );
    }
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        height: 72,
        borderRadius: 6,
        marginHorizontal: 4,
        marginRight: 8,
        marginBottom: 6,
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        shadowRadius: 1,
        shadowOffset: { height: 0.5 },
        shadowOpacity: 0.5,
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    dateContainerStyle: {
        backgroundColor: 'rgba(0,0,0,.05)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 68,
    },
    dateDayText: { fontSize: 13, color: 'rgba(0,0,0,.57)' },
    dateWeekText: { fontSize: 18 },
    leftTextContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 16,
        flex: 1,
    },
    rightTextContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 12,
    },
    rightText: {
        color: 'rgba(0,0,0,.57)',
        fontSize: 13,
    },
    styleTitulo: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        height: 72,
    },
    labelCollumn: {
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        width: 7,
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
    },
    gridColumn: {
        alignItems: 'center',
    },
    gridColumnAlignLeft: {
        alignItems: 'flex-start',
    },
    gridRowText: {
        fontSize: 14,
        color: 'rgba(0,0,0,.57)',
    },
});
