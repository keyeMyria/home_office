// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react/native';

// Store
import alunoStore from '../../../stores/AlunoStore';

// Components
import ScreenShell from '../../../components/ScreenShell';
import GradeChartItem from '../../../components/GradeChartItem';

@observer
export default class ScoreScreen extends Component {
    renderGradeChart() {
        return alunoStore.notas.map(grade =>
          <GradeChartItem key={grade.disciplina.id} grade={grade} />,
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Notas" navigate={navigate} loading={alunoStore.loading}>
            <View>
              <Text style={styles.avgText}>Média 60%</Text>
            </View>
            <View style={styles.chartContainer}>
              {this.renderGradeChart()}
            </View>
          </ScreenShell>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 20,
    },
    avgText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: 'center',
    },
});
