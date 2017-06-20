import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { Text, Thumbnail, Button } from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../store';

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
      <View style={styles.bubbleMenuItemView}>
        <Button disabled={!active} style={activeStyle}>
          <Text>{name}</Text>
        </Button>
      </View>
    );
}

function BubbleMenuItem(props) {
    const { item, onPress } = props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          {item}
        </View>
      </TouchableWithoutFeedback>
    );
}

@observer
export default class BubbleMenu extends Component {
    renderSchoolYear() {
        const mapFunc = (year, index) => {
            const active = year.id === store.schoolYearSelected.id;
            const item = <SchoolYearItem name={year.name} active={active} />;
            const onPress = () => store.selectSchoolYear(year.id);
            return <BubbleMenuItem key={index} item={item} onPress={onPress} />;
        };

        return store.schoolYears.map(mapFunc);
    }

    renderStudent() {
        const mapFunc = (student, index) => {
            const { name, id } = student;
            const active = id === store.studentSelected.id;
            const imageSource = store.getStudentImagebyId(id);
            const item = <StudentItem name={name} active={active} source={imageSource} />;
            const onPress = () => store.selectStudent(student.id);

            return <BubbleMenuItem key={index} item={item} onPress={onPress} />;
        };

        return store.childStudents.map(mapFunc);
    }

    render() {
        const { mode } = this.props;
        const modeMap = {
            schoolYear: this.renderSchoolYear,
            student: this.renderStudent,
        };

        const renderItens = modeMap[mode] || modeMap.student;

        return (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bubbleMenuView}
          >
            {renderItens()}
          </ScrollView>
        );
    }
}
