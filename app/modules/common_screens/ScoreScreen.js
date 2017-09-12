// @flow
import React, { Component } from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import _ from 'lodash';

// Store
import alunoStore from './../../stores/AlunoStore';
import escolaStore from './../../stores/EscolaStore';

// Components
import SegmentedControl from './../../components/mobx_fields/SegmentedControl';
import ScreenShell from './../../components/ScreenShell';
import GradeChartItem from './../../components/GradeChartItem';
import BubbleMenu from './../../components/BubbleMenu';

@observer
export default class ScoreScreen extends Component {
    @observable
    filtro = {
        bimestre: 0,
    };

    renderGradeChart() {
        const filtro = toJS(this.filtro, false);
        return alunoStore.notas.map(grade => (
          <GradeChartItem key={grade.disciplina.id} grade={grade} filtro={filtro} />
        ));
    }

    componentWillReact() {
        LayoutAnimation.easeInEaseOut();
    }

    get screenShellProps(): * {
        const { navigate } = this.props.navigation;
        return {
            title: 'Notas',
            navigate,
            loading: alunoStore.loading,
            padder: false,
        };
    }

    renderSegmentedControl() {
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre').substr(0, 3);
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(0, num + 1).map((n) => {
            const _label = n === 0 ? 'Total' : `${n}º ${label}`;
            return [n, _label];
        });
        return <SegmentedControl items={items} store={this.filtro} storeKey="bimestre" />;
    }

    render() {
        return (
          <ScreenShell {...this.screenShellProps}>
            <BubbleMenu />
            <View style={{ padding: 10 }}>{this.renderSegmentedControl()}</View>
            <View style={styles.chartContainer}>{this.renderGradeChart()}</View>
          </ScreenShell>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 10,
    },
});
