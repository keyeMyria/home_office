// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react/native';

// Store
import alunoStore from './../../stores/AlunoStore';

// Components
import ScreenShell from './../../components/ScreenShell';
import GradeChartItem from './../../components/GradeChartItem';
import BubbleMenu from './../../components/BubbleMenu';

@observer
export default class ScoreScreen extends Component {
    renderGradeChart() {
        return alunoStore.notas.map(grade =>
          <GradeChartItem key={grade.disciplina.id} grade={grade} />,
        );
    }

    get screenShellProps() {
        const { navigate } = this.props.navigation;
        return {
            title: 'Notas',
            navigate,
            loading: alunoStore.loading,
            padder: false,
        };
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <BubbleMenu />
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
