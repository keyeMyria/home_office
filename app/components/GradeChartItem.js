import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

export default class GradeChartItem extends Component {
    render() {
        const { disciplina, acumulado, total } = this.props.grade;

        const percent = acumulado / total;
        const percentText = `${Math.floor(percent * 100)}%`;
        const points = `${total}/${acumulado}`;
        const width = { width: getWidth(percent) };
        const color = { backgroundColor: getColor(disciplina.id) };

        return (
          <View style={styles.gradeContainer}>
            <View style={styles.gradeLeftContainer}>
              <Text style={styles.diciplineName}>
                {disciplina.titulo}
              </Text>
              <Text style={styles.diciplinePoints}>
                {points}
              </Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View style={[styles.chartBar, width, color]}>
                <Text style={styles.percentText}>
                  {percentText}
                </Text>
              </View>
            </View>
          </View>
        );
    }
}

/**
 * Array with the color for each discipline
 */
const COLOR_ARRAY = [
    'orange',
    'mediumturquoise',
    'gray',
    'brown',
    'fuchsia',
    'green',
    'red',
    'blue',
];

/**
 * Returns the width of the bar
 * to prevent invisible bars, the minimum bar width is fixed in 10%
 *
 * @param {number} percent
 */
function getWidth(percent: number): number {
    const total = Dimensions.get('window').width - 100;
    const width = Math.floor(total * percent);
    return width < 10 ? 10 : width;
}

/**
 *  Returns the color of each dicipline
 *
 * @param {number} id
 */
function getColor(id: number): string {
    return COLOR_ARRAY[id - 1] || 'gray';
}

const styles = StyleSheet.create({
    gradeContainer: {
        flexDirection: 'row',
    },
    gradeLeftContainer: {
        width: 90,
        borderRightWidth: 2,
        borderColor: '#000',
        paddingRight: 10,
        justifyContent: 'center',
    },
    chartBar: {
        backgroundColor: 'green',
        height: 35,
        justifyContent: 'center',
    },
    diciplineName: {
        textAlign: 'right',
    },
    chartBarContainer: {
        justifyContent: 'center',
        height: 50,
    },
    diciplinePoints: {
        textAlign: 'right',
        color: '#aaa',
        fontSize: 12,
    },
    percentText: {
        color: '#fff',
        textAlign: 'center',
    },
});
