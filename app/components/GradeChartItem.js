// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import _ from 'lodash';

export type GradeChartItemProps = $PropertyType<GradeChartItem, 'props'>;

export default class GradeChartItem extends Component {
    props: {
        grade: {
            disciplina: { titulo: string },
            acumulado: any,
            total: any,
        },
    };

    get sumAcumulado(): number {
        const { acumulado } = this.props.grade;
        return acumulado['0'];
    }

    get sumTotal(): number {
        const { total } = this.props.grade;
        return total['0'];
    }

    get percent(): number {
        return this.sumTotal ? _.clamp(this.sumAcumulado / this.sumTotal, 0, 1) : 0;
    }

    get percentText(): string {
        return this.percent ? `${Math.floor(this.percent * 100)}%` : '';
    }

    get pointsText(): string {
        return `${this.sumAcumulado.toFixed(0)}/${this.sumTotal.toFixed(0)}`;
    }

    get width(): { width: number } {
        const total = Dimensions.get('window').width - 100;
        const w = Math.floor(total * this.percent) || 0;
        const width = w && _.clamp(w, 15, total);
        return { width };
    }

    get color(): { backgroundColor: string } {
        let backgroundColor = 'rgb(158, 0, 0)'; // Vermelho (Bordô)

        if (this.percent >= 0.7) {
            backgroundColor = 'rgb(0,180,0)'; // Verde
        } else if (this.percent >= 0.6) {
            backgroundColor = 'rgb(255,255,0)'; // Amerelo
        } else if (this.percent >= 0.5) {
            backgroundColor = 'rgb(255, 50, 0)'; // Laranja
        }
        return { backgroundColor };
    }

    render() {
        const { disciplina } = this.props.grade;

        return (
          <View style={styles.gradeContainer}>
            <View style={styles.gradeLeftContainer}>
              <Text style={styles.diciplineName}>{disciplina.titulo}</Text>
              <Text style={styles.diciplinePoints}>{this.pointsText}</Text>
            </View>
            <View style={styles.chartBarContainer}>
              <View style={[styles.chartBar, this.width, this.color]}>
                <Text style={styles.percentText}>{this.percentText}</Text>
              </View>
            </View>
          </View>
        );
    }
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
        color: 'rgba(0,0,0,0.87)',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
