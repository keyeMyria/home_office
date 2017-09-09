// @flow
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import { Container, Content, Header, Body, Title, Icon, Left } from 'native-base';
import Drawer from 'react-native-drawer';
import _ from 'lodash';

// Store
import alunoStore from './../../stores/AlunoStore';
import escolaStore from './../../stores/EscolaStore';

// Components
import SegmentedControl from './../../components/mobx_fields/SegmentedControl';
import { createPickerField } from './../../components/mobx_fields/PickerField';
import ScreenShell from './../../components/ScreenShell';
import GradeChartItem from './../../components/GradeChartItem';
import BubbleMenu from './../../components/BubbleMenu';

@observer
export default class ScoreScreen extends Component {
    _drawer: Drawer;
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
            rightText: 'Filtros',
            rightPress: () => this._drawer.open(),
            showRight: true,
            rightIcon: 'filter-list',
        };
    }

    renderPeriodo() {
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre');
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(1, num + 1).map(n => [n, `${n}º ${label}`]);
        return createPickerField(label, items, this.filtro, 'bimestre', {
            placeholder: 'Acumulado',
        });
    }

    renderSegmentedControl() {
        const label = _.capitalize(escolaStore.getConfig('nomePeriodo') || 'bimestre');
        const num = escolaStore.getConfig('numeroPeriodos') || 4;
        const items = _.range(0, num + 1).map((n) => {
            const _label = n === 0 ? 'Total' : `${n}º ${label}`;
            return [n, _label];
        });
        return <SegmentedControl items={items} store={this.filtro} storeKey="bimestre" />;
    }

    render() {
        const content = (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableOpacity onPress={() => this._drawer.close()}>
                  <Icon name="close" />
                </TouchableOpacity>
              </Left>
              <Body>
                <Title>Filtros</Title>
              </Body>
            </Header>
            <Content padder>{this.renderPeriodo()}</Content>
          </Container>
        );

        const drawerStyles = {};

        return (
          <Drawer
            ref={ref => (this._drawer = ref)} // eslint-disable-line no-return-assign
            type="overlay"
            side="right"
            content={content}
            tapToClose
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            tweenHandler={ratio => ({
                main: { opacity: 1 },
                mainOverlay: { opacity: ratio / 2, backgroundColor: 'black' },
            })}
            styles={drawerStyles}
          >
            <ScreenShell {...this.screenShellProps}>
              <BubbleMenu />
              <View style={{ padding: 10 }}>
                {this.renderSegmentedControl()}
              </View>
              <View style={styles.chartContainer}>{this.renderGradeChart()}</View>
            </ScreenShell>
          </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 10,
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
