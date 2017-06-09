import React, { Component } from 'react';
import {
  ScrollView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  Thumbnail,
} from 'native-base';

import { observer } from 'mobx-react/native';
import store from '../../../store';

import { styles } from '../../../themes/educareTheme';

const BubbleMenuItem = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.bubbleMenuItemView}>
        <Thumbnail
          source={require('../../../img/user.png')}
          style={props.active ? styles.bubbleMenuItemActive : styles.bubbleMenuItemInactive} />
        <Text style={styles.bubbleMenuItemText}>{props.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

@observer
export default class BubbleMenu extends Component {

  render() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.bubbleMenuView}>
        {store.childStudents.map((student, index) =>
          <BubbleMenuItem
            key={index}
            name={student.name}
            active={student.id === store.studentSelected.id}
            onPress={() => store.selectStudent(student.id)}
          />
        )}
      </ScrollView>
    );
  }
}