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
    Button,
} from 'native-base';

import { observer } from 'mobx-react';

const StudentItem = (props) => {
    const { student, active, onPress } = props;
    return (
      <ListItem icon onPress={() => onPress(student)}>
        <Left>
          <Thumbnail small source={student.avatar} />
        </Left>
        <Body>
          <Text>
            {student.name}
          </Text>
        </Body>
        <Right>
          <CheckBox checked={active} style={{ marginRight: 20 }} onPress={onPress} />
        </Right>
      </ListItem>
    );
};

@observer
export default class StudentPicker extends Component {
    props: {
        students: Array<any>,
        selected: Array<number | string>,
        selectAll: boolean,
    };

    selectStudent = (student) => {
        const index = this.props.selected.indexOf(student.id);
        if (index === -1) {
            this.props.selected.push(student.id);
        } else {
            this.props.selected.splice(index, 1);
        }
    };

    selectAll = () => {
        this.props.students.forEach((aluno) => {
            const index = this.props.selected.indexOf(aluno.id);
            if (index === -1) {
                this.props.selected.push(aluno.id);
            } else {
                this.props.selected.splice(index, 1);
            }
        });
    };

    render() {
        const { students } = this.props;
        const mapFunc = student =>
          (<StudentItem
            key={student.id}
            student={student}
            onPress={this.selectStudent}
            active={this.props.selected.indexOf(student.id) !== -1}
          />);

        return (
          <View>
            <Item stackedLabel style={{ flexDirection: 'row', marginTop: 25 }}>
              <Label>Selecione os Alunos:</Label>
              <View style={{ flex: 1 }} />
              {this.props.selectAll &&
                <Button small onPress={this.selectAll}>
                  <Text>Sel. Todos</Text>
                </Button>}
            </Item>
            <List>
              {students.map(mapFunc)}
            </List>
          </View>
        );
    }
}
