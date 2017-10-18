// @flow
import { Alert } from 'react-native';

function success(message: string, onPress?: () => void): void {
    if (!onPress) {
        Alert.alert('Sucesso', message);
    } else {
        Alert.alert('Sucesso', message, [{ text: 'OK', onPress }], { cancelable: false });
    }
}

function error(message) {
    Alert.alert('Erro', message);
}


function confirm(
    title: string = '',
    message: string = '',
    okText: string = 'OK',
    cancelText: string = 'Cancelar',
) {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                { text: cancelText, onPress: () => resolve(false), style: 'cancel' },
                { text: okText, onPress: () => resolve(true) },
            ],
            { cancelable: true, onDismiss: () => resolve(false) },
        );
    });
}

export default {
    success,
    confirm,
    error,
};
