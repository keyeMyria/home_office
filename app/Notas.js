import React, { Component } from 'react';
import { ART, View } from 'react-native';
const { Surface, Group, Shape } = ART;

// import { pie, arc, line } from 'd3-shape';

import * as d3 from 'd3';

const data = [
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
  { date: new Date(2007, 3, 4), value: 98.98 },
];

export default class Notas extends Component {

  render() {

    var line = d3.line().x((d) => d.date).y((d) => d.value);

    console.log(line(data));

    return (
      <View>
        <Surface width={500} height={500}>
          <Group x={100} y={0}>
            <Shape
              d={line(data)}
              stroke="#000"
              strokeWidth={1}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}