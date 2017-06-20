import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Left, Right, Icon, Body } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import BubbleMenu from '../../../components/BubbleMenu';

const COLOR_INTERPOLATION = [
    '#ff0000',
    '#e40f00',
    '#c91e00',
    '#af2d00',
    '#943c00',
    '#794b00',
    '#5e5a00',
    '#446900',
    '#297800',
    '#0e8700',
    '#0e8700',
];

function getWidth(percent) {
    const total = Dimensions.get('window').width - 130;
    const width = Math.floor(total * percent);
    return width < 10 ? 10 : width;
}

function getColor(percent) {
    const index = Math.floor(percent * 10);

    return COLOR_INTERPOLATION[index] || 'gray';
}

@observer
export default class AlertScreen extends Component {
    renderGradeChart() {
        const { id } = store.studentSelected;
        const grades = store.grades.filter(o => o.studentId === id)[0];
        const mapFunc = (item, index) => {
            const percent = Math.floor(item.pointsReceived / item.pointsGiven * 100);
            const points = `${item.pointsGiven}/${item.pointsReceived}`;
            const width = { width: getWidth(item.pointsReceived / item.pointsGiven) };
            const color = { backgroundColor: getColor(item.pointsReceived / item.pointsGiven) };

            return (
              <View key={index} style={styles.gradeContainer}>
                <View style={styles.gradeLeftContainer}>
                  <Text style={styles.diciplineName}>{item.name}</Text>
                  <Text style={styles.diciplinePoints}>{points}</Text>
                </View>
                <View style={styles.chartBarContainer}>
                  <View style={[styles.chartBar, width, color]}>
                    <Text style={styles.percentText}>{percent}%</Text>
                  </View>
                </View>
              </View>
            );
        };

        return grades.items.map(mapFunc);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
          <Container>
            <Header appHeader>
              <Left>
                <TouchableWithoutFeedback onPress={() => navigate('DrawerOpen')}>
                  <Icon name="menu" />
                </TouchableWithoutFeedback>
              </Left>
              <Body>
                <Title>Notas</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <BubbleMenu />
              <View>
                <Text style={styles.avgText}>Média 60%</Text>
              </View>
              <View style={styles.chartContainer}>
                {this.renderGradeChart()}
              </View>
            </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        marginTop: 20,
    },
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
    avgText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: 'center',
    },
});
