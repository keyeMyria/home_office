// @flow
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    label: string,
};

// Components
export default class CalendarWeek extends PureComponent {
    props: Props;

    static defaultProps = {
        label: 'INVALID WEEK',
    };

    render() {
        const { label } = this.props;
        return (
          <View style={styles.container}>
            <View style={styles.separator}>
              <Text style={styles.text}>{label}</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        elevation: 4,
    },
    separator: {
        backgroundColor: '#C5CAE9',
        paddingVertical: 0,
        paddingHorizontal: 12,
        borderRadius: 8,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'rgba(0,0,0,.57)',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
});
