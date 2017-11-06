// @flow
/* eslint react/no-multi-comp: 0 */
import React, { Component, PureComponent } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Thumbnail, Button } from 'native-base';

import { observer } from 'mobx-react/native';

import userStore from './../stores/UserStore';
import professorStore from './../stores/ProfessorStore';
import responsavelStore from './../stores/ResponsavelStore';

import { styles } from '../themes/educareTheme';

class StudentItem extends PureComponent {
    onPress = () => {
        this.props.onPress(this.props.id);
    };

    render() {
        const { active, source, name } = this.props;
        const activeStyle = active ? styles.bubbleMenuItemActive : styles.bubbleMenuItemInactive;

        return (
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.bubbleMenuItemView}>
              <Thumbnail source={source} style={activeStyle} />
              <Text style={styles.bubbleMenuItemText}>{name}</Text>
            </View>
          </TouchableOpacity>
        );
    }
}

class SchoolYearItem extends PureComponent {
    onPress = () => {
        this.props.onPress(this.props.id);
    };

    render() {
        const { active, name } = this.props;
        return (
          <Button
            bordered={!active}
            style={{ borderRadius: 30, marginHorizontal: 5 }}
            onPress={this.onPress}
          >
            <Text style={{ fontSize: 15 }}>{name}</Text>
          </Button>
        );
    }
}

@observer
export default class BubbleMenu extends Component {
    onAnoPress = (id: number) => {
        requestAnimationFrame(() => professorStore.selectAno(id));
    };

    onStudentPress = (id: number) => {
        requestAnimationFrame(() => responsavelStore.selectAluno(id));
    };

    renderSchoolYear(ano: any) {
        let active = false;
        if (professorStore.anoSelectedId) {
            active = ano.id === professorStore.anoSelectedId;
        }

        return (
          <SchoolYearItem
            key={ano.id}
            id={ano.id}
            name={ano.abreviacao}
            active={active}
            onPress={this.onAnoPress}
          />
        );
    }

    renderStudent(aluno: any, idx: number) {
        const { nome, id } = aluno;
        let active = idx === 0;
        if (responsavelStore.alunoSelectedId) {
            active = id === responsavelStore.alunoSelectedId;
        }
        return (
          <StudentItem
            key={id}
            id={id}
            name={nome}
            active={active}
            source={aluno.imageSource}
            onPress={this.onStudentPress}
          />
        );
    }

    renderItems() {
        if (userStore.isResponsavel) {
            if (responsavelStore.loading) return null;
            return responsavelStore.alunos.map(this.renderStudent, this);
        } else if (userStore.canAddActivity) {
            if (professorStore.loading) return null;
            return professorStore.anos.map(this.renderSchoolYear, this);
        }
        return null;
    }

    render() {
        if (userStore.isAluno) return null;
        return (
          <View style={localStyles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {this.renderItems()}
            </ScrollView>
          </View>
        );
    }
}

const localStyles = StyleSheet.create({
    container: {
        borderWidth: 0,
        shadowRadius: 3,
        shadowOffset: { height: 1 },
        shadowOpacity: 0.24,
        paddingVertical: 10,
        elevation: 2,
        backgroundColor: 'rgba(245,245,245, 1)',
    },
});
