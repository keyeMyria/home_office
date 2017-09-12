// @flow
import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text, Thumbnail, Button } from 'native-base';

import { observer } from 'mobx-react/native';

import userStore from './../stores/UserStore';
import professorStore from './../stores/ProfessorStore';
import responsavelStore from './../stores/ResponsavelStore';

import { styles } from '../themes/educareTheme';

function StudentItem(props) {
    const { active, source } = props;
    const activeStyle = active ? styles.bubbleMenuItemActive : styles.bubbleMenuItemInactive;

    return (
      <View style={styles.bubbleMenuItemView}>
        <Thumbnail source={source} style={activeStyle} />
        <Text style={styles.bubbleMenuItemText}>{props.name}</Text>
      </View>
    );
}

function SchoolYearItem(props) {
    const { active, name } = props;
    const activeStyle = active ? styles.bubbleMenuItemActive : styles.bubbleMenuItemInactive;
    return (
      <View style={{ ...styles.bubbleMenuItemView, borderWidth: 0 }}>
        <Button disabled={!active} style={activeStyle}>
          <Text>{name}</Text>
        </Button>
      </View>
    );
}

function BubbleMenuItem(props) {
    const { item, onPress } = props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View>{item}</View>
      </TouchableOpacity>
    );
}

@observer
export default class BubbleMenu extends Component {
    renderSchoolYear() {
        const schoolYearItem = (
          <SchoolYearItem name="Todos" active={!professorStore.anoSelectedId} />
        );
        const bubbleMenuItem = (
          <BubbleMenuItem
            key={0}
            item={schoolYearItem}
            onPress={() => professorStore.selectAno(0)}
          />
        );

        const mapFunc = (ano) => {
            let active = false;
            if (professorStore.anoSelectedId) {
                active = ano.id === professorStore.anoSelectedId;
            }
            const item = <SchoolYearItem name={ano.abreviacao} active={active} />;
            const onPress = () => professorStore.selectAno(ano.id);
            return <BubbleMenuItem key={ano.id} item={item} onPress={onPress} />;
        };
        if (professorStore.loading) return null;
        const items = professorStore.anos.map(mapFunc);
        return [bubbleMenuItem].concat(...items);
    }

    renderStudent() {
        const mapFunc = (aluno, index) => {
            const { nome, id } = aluno;
            let active = index === 0;
            if (responsavelStore.alunoSelectedId) {
                active = id === responsavelStore.alunoSelectedId;
            }
            const item = <StudentItem name={nome} active={active} source={aluno.imageSource} />;
            const onPress = () => requestAnimationFrame(() => responsavelStore.selectAluno(id));
            return <BubbleMenuItem key={id} item={item} onPress={onPress} />;
        };
        if (responsavelStore.loading) return null;
        return responsavelStore.alunos.map(mapFunc);
    }

    render() {
        const roleMap = {
            PROFESSOR: this.renderSchoolYear,
            RESPONSAVEL: this.renderStudent,
            ALUNO: undefined, // Prevent the the rendering
            DIRETOR: this.renderSchoolYear,
        };

        const renderItens = roleMap[userStore.role];

        if (!renderItens) return null;

        return (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ ...styles.bubbleMenuView, borderWidth: 0 }}
          >
            {renderItens()}
          </ScrollView>
        );
    }
}
