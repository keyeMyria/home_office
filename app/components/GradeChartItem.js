import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

export default class GradeChartItem extends Component {
    static propTypes = {
        grade: React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            pointsReceived: React.PropTypes.number.isRequired,
            pointsGiven: React.PropTypes.number.isRequired,
        }).isRequired,
    };

    render() {
        const { id, name, pointsReceived, pointsGiven } = this.props.grade;

        const percent = pointsReceived / pointsGiven;
        const percentText = `${Math.floor(percent * 100)}%`;
        const points = `${pointsGiven}/${pointsReceived}`;
        const width = { width: getWidth(percent) };
        const color = { backgroundColor: getColor(id) };

        return (
          <View style={styles.gradeContainer}>
            <View style={styles.gradeLeftContainer}>
              <Text style={styles.diciplineName}>
                {name}
              </Text>
              <Text style={styles.diciplinePoints}>
                {points}
              </Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View style={[styles.chartBar, width, color]}>
                <Text style={styles.percentText}>{percentText}</Text>
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
    const total = Dimensions.get('window').width - 130;
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
        width: 120,
        borderRightWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 10,
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
