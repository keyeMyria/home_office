import { AsyncStorage } from 'react-native';
import PushNotification from 'react-native-push-notification';
import uuid from 'uuid';
import AWS from 'aws-sdk';

import CONFIG from './../../config';

// Configura credenciais da AWS
AWS.config.region = CONFIG.PUSH.REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: CONFIG.PUSH.IDENTITY_POOL_ID,
});

type asyncStoreReturnObject = {
    token: string,
    endpoint: string,
};

class PushHandler {
    _token: string;
    _endpointArn: string;

    constructor() {
        this.init();
    }

    async init() {
        const { token, endpoint } = await this._getFromAsyncStorage();
        this._token = token || null;
        this._endpointArn = endpoint || null;
    }

    _getFromAsyncStorage(): Promise<asyncStoreReturnObject> {
        return Promise.all([
            AsyncStorage.getItem(CONFIG.ASYNC_STORE.PUSH_TOKEN),
            AsyncStorage.getItem(CONFIG.ASYNC_STORE.PUSH_ENDPOINT),
        ]).then(([token, endpoint]) => ({ token, endpoint }));
    }

    _saveInAsyncStorage({ token, endpoint }: asyncStoreReturnObject): void {
        AsyncStorage.setItem(CONFIG.ASYNC_STORE.PUSH_TOKEN, token);
        AsyncStorage.setItem(CONFIG.ASYNC_STORE.PUSH_ENDPOINT, endpoint);
    }

    _clearAsyncStorage(): void {
        AsyncStorage.removeItem(CONFIG.ASYNC_STORE.PUSH_TOKEN);
        AsyncStorage.removeItem(CONFIG.ASYNC_STORE.PUSH_ENDPOINT);
    }

    async getPlatformEndpoint(token: string) {
        return new Promise((resolve, reject) => {
            const callback = (e, d) => (!e ? resolve(d) : reject(e));
            const params = {
                PlatformApplicationArn: CONFIG.PUSH.APPLICATION_ARN,
                Token: uuid(),
                Attributes: { Token: token },
                CustomUserData: 'TESTE',
            };
            const sns = new AWS.SNS({ region: CONFIG.PUSH.REGION });
            sns.createPlatformEndpoint(params, callback);
        });
    }

    needsUpdate(endpoint: string) {
        return this._endpointArn !== endpoint;
    }

    onError = (error) => {
        console.warn('ERROR:', error);
    }

    onToken = (token) => {
        console.log('TOKEN:', token);
    };

    onNotification = (notification) => {
        console.warn('NOTIFICATION:', notification);
    }

    configureNotifications(): void {
        PushNotification.configure({
            onRegister: this.onToken,
            onNotification: this.onNotification,
            onError: this.onError,
            senderID: CONFIG.PUSH.SENDER_ID,
        });
    }
}

const pushHandler = new PushHandler();

export default pushHandler;
