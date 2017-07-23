// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import { observer } from 'mobx-react/native';
import type { Aviso } from './../models';

@observer
export default class CardAlert extends Component {
    props: {
        alert: Aviso,
    };

    render() {
        const alert = this.props.alert;
        return (
          <View style={styles.cardStyle}>
            <View style={styles.iconView}>
              <Icon name={alert.iconName} style={styles.icon} />
            </View>
            <View style={styles.textView}>
              <View style={styles.textFirstLine}>
                <Text style={styles.textTitle}>
                  {alert.titulo}
                </Text>
                <View style={{ flex: 1 }} />
                <Text style={styles.textDateTime}>
                  {alert.data.fromNow()}
                </Text>
              </View>
              <View>
                <Text style={styles.textDetails}>
                  {alert.detalhes}
                </Text>
              </View>
            </View>
          </View>
        );
    }
}

const styles = {
    cardStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    iconView: {
        backgroundColor: '#7792A9',
        borderRadius: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12,
    },
    icon: {
        fontSize: 20,
        color: '#fff',
    },
    textView: {
        justifyContent: 'center',
        marginRight: 12,
        flex: 1,
    },
    textFirstLine: {
        flexDirection: 'row',
    },
    textTitle: {
        color: '#000',
        fontSize: 15,
    },
    textDateTime: {
        color: '#435463',
        fontSize: 13,
        alignSelf: 'flex-end',
    },
    textDetails: {
        color: '#435463',
        fontSize: 14,
    },
};
