import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  Thumbnail,
  Button,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

const StudentItem = props => {
  return (
    <View style={styles.bubbleMenuItemView}>
      <Thumbnail
        source={props.source}
        style={props.active ? styles.bubbleMenuItemActive : styles.bubbleMenuItemInactive} />
      <Text style={styles.bubbleMenuItemText}>{props.name}</Text>
    </View>
  );
};

const SchoolYearItem = props => {
  return (
    <View style={styles.bubbleMenuItemView}>
      <Button
        disabled={!props.active}
        style={props.active ? styles.bubbleMenuButtonActive : styles.bubbleMenuButtonInactive}>
        <Text>{props.name}</Text>
      </Button>
    </View>
  );
};

const BubbleMenuItem = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        {props.item}
      </View>
    </TouchableWithoutFeedback>
  );
};

@observer
export default class BubbleMenu extends Component {

  render() {

    let items = <View />;

    switch (this.props.mode) {
      case 'schoolYear':
        items = store.schoolYears.map((year, index) =>
          <BubbleMenuItem
            key={index}
            onPress={() => store.selectSchoolYear(year.id)}
            item={
              <SchoolYearItem
                name={year.name}
                active={year.id === store.schoolYearSelected.id}
              />
            }
          />
        );
        break;
      case 'student':
      default:
        items = store.childStudents.map((student, index) =>
          <BubbleMenuItem
            key={index}
            onPress={() => store.selectStudent(student.id)}
            item={
              <StudentItem
                name={student.name}
                active={student.id === store.studentSelected.id}
                source={store.getStudentImagebyId(student.id)}
              />
            }
          />
        );
        break;
    }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.bubbleMenuView}>
        {items}
      </ScrollView>
    );
  }
}