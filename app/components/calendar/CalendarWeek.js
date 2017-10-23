// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Separator, Text } from 'native-base';

// Components
export default class CalendarWeek extends PureComponent {
    props: {
        label: string,
    };

    static defaultProps = {
        label: '',
    };

    render() {
        const { label } = this.props;
        return (
          <View>
            <Separator style={styles.separator}>
              <Text>{label}</Text>
            </Separator>
          </View>
        );
    }
}

const styles = {
    separator: {
        paddingLeft: 30,
    },
};
