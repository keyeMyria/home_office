// @flow
import React, { Component } from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Text, Card, CardItem, Body, Icon, Col, Grid } from 'native-base';
import type Exercicio from '../store/models/Exercise';

const Touchable = (props) => {
    const { onPress } = props;

    if (Platform.OS === 'android') {
        return (
          <TouchableNativeFeedback onPress={onPress}>
            {props.children}
          </TouchableNativeFeedback>
        );
    }
    return (
      <TouchableOpacity onPress={onPress}>
        {props.children}
      </TouchableOpacity>
    );
};

export default class ExerciseCard extends Component {
    render() {
        const item: Exercicio = this.props.item;
        const onPress = () => this.props.onPress(item);

        return (
          <Touchable onPress={onPress}>
            <Card button style={{ marginBottom: 15, backgroundColor: '#f5f5f5' }}>
              <CardItem header style={{ backgroundColor: 'transparent' }}>
                <Text>
                  {item.title}
                </Text>
              </CardItem>
              {!!item.detalhes &&
                <CardItem style={{ backgroundColor: 'transparent' }}>
                  <Body>
                    <Text>
                      {item.detalhes}
                    </Text>
                  </Body>
                </CardItem>}
              <CardItem footer style={{ backgroundColor: '#e3e3e3' }}>
                <Grid>
                  <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="check-box" />
                    <Text>
                      {item.numQuestoes} Questões
                                </Text>
                  </Col>
                  <Col
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                  >
                    <Icon name="schedule" />
                    <Text>
                      {item.duracaoTexto}
                    </Text>
                  </Col>
                </Grid>
              </CardItem>
            </Card>
          </Touchable>
        );
    }
}
