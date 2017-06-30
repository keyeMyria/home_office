import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// Store
import { observer } from 'mobx-react/native';
import store from '../../../store';

// Components
import ScreenShell from '../../../components/ScreenShell';
import GradeChartItem from '../../../components/GradeChartItem';

@observer
export default class ScoreScreen extends Component {
    renderGradeChart() {
        const { id } = store.studentSelected;
        const grades = store.grades.filter(o => o.studentId === id)[0];
        return grades.items.map((grade, index) => <GradeChartItem key={index} grade={grade} />);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <ScreenShell title="Notas" navigate={navigate}>
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
