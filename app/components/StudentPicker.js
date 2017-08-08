// @flow
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

import { observer } from 'mobx-react/native';

import type { Aluno } from './../models';

const StudentItem = observer((props: { aluno: Aluno }) => {
    const { aluno } = props;
    const onPress = () => {
        aluno._selected = !aluno._selected;
    };
    return (
      <ListItem icon onPress={onPress}>
        <Left>
          <Thumbnail small source={aluno.imageSource} />
        </Left>
        <Body>
          <Text>
            {aluno.nome}
          </Text>
        </Body>
        <Right>
          <CheckBox
            checked={!!aluno._selected}
            style={{ marginRight: 20 }}
            onPress={onPress}
          />
        </Right>
      </ListItem>
    );
});

@observer
export default class StudentPicker extends Component {
    props: {
        alunos: Array<Aluno>,
        /** If True shows a selectAll button */
        selectAll?: boolean,
    };

    static defaultProps = {
        selectAll: false,
    };

    selectAll = () => {
        this.props.alunos.forEach((aluno) => {
            // eslint-disable-next-line no-param-reassign
            aluno._selected = !aluno._selected;
        });
    };

    render() {
        const { alunos } = this.props;
        const mapFunc = aluno => <StudentItem key={aluno.pk} aluno={aluno} />;

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
              {alunos.map(mapFunc)}
            </List>
          </View>
        );
    }
}
