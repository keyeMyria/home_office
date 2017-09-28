// @flow
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Dimensions } from 'react-native';
import codePush from 'react-native-code-push';

const statusToTextMap = {
    [codePush.SyncStatus.CHECKING_FOR_UPDATE]: 'Conectando ao servidor',
    [codePush.SyncStatus.UP_TO_DATE]: 'Carregando Aplicativo',
    [codePush.SyncStatus.DOWNLOADING_PACKAGE]: 'Carregando Dados',
    [codePush.SyncStatus.INSTALLING_UPDATE]: 'Salvando Dados',
    [codePush.SyncStatus.UNKNOWN_ERROR]: 'Parece que você está sem Internet',
};

const maxProgressValue = Dimensions.get('window').width - 70;

export default class CodePushStatus extends Component {
    props: {
        percent: number,
        status: string,
    };

    state = {
        percent: new Animated.Value(10),
    };

    componentWillReceiveProps(props: $PropertyType<CodePushStatus, 'props'>) {
        if (props.percent) {
            const value = maxProgressValue * props.percent;
            Animated.timing(this.state.percent, { toValue: value }).start();
        }
    }

    render() {
        const { status } = this.props;
        const isDownloading = status === codePush.SyncStatus.DOWNLOADING_PACKAGE;
        const isError = status === codePush.SyncStatus.UNKNOWN_ERROR;
        return (
          <View style={styles.view}>
            {!isDownloading && !isError && <ActivityIndicator size="large" color="#fff" />}
            {isDownloading && (
            <Animated.View
              style={{
                  height: 10,
                  borderRadius: 5,
                  width: this.state.percent,
                  backgroundColor: '#fff',
                  alignSelf: 'flex-start',
              }}
            />
                )}
            <Text style={styles.text}>
              {statusToTextMap[status] || 'Aguarde, Conectando ao Servidor'}
            </Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        padding: 15,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },
});
