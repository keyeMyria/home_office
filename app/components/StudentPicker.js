import React, { Component } from 'react';
import { View } from 'react-native';
import {
    List,
    ListItem,
    Left,
    Thumbnail,
    Body,
    Text,
    Right,
    CheckBox,
    Item,
    Label,
} from 'native-base';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const StudentItem = (props) => {
    const { student, active, onPress } = props;
    return (
      <ListItem icon onPress={() => onPress(student)}>
        <Left>
          <Thumbnail small source={student.avatar} />
        </Left>
        <Body><Text>{student.name}</Text></Body>
        <Right>
          <CheckBox checked={active} style={{ marginRight: 20 }} onPress={onPress} />
        </Right>
      </ListItem>
    );
};

@observer
export default class StudentPicker extends Component {
    @observable selected = [];

    selectStudent = (student) => {
        const index = this.selected.indexOf(student.id);
        if (index === -1) {
            this.selected.push(student.id);
        } else {
            this.selected.splice(index, 1);
        }
    };

    render() {
        const { students } = this.props;
        const mapFunc = student =>
          <StudentItem
            key={student.id}
            student={student}
            onPress={this.selectStudent}
            active={this.selected.indexOf(student.id) !== -1}
          />;

        return (
          <View>
            <Item stackedLabel>
              <Label>Selecione os Alunos:</Label>
            </Item>
            <List>
              {students.map(mapFunc)}
            </List>
          </View>
        );
    }
}
