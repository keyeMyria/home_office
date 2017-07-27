// @flow
import PushNotification from 'react-native-push-notification';
import uuid from 'uuid';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

import CONFIG from './../../config';

// Configura credenciais da AWS
AWS.config.region = CONFIG.PUSH.REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: CONFIG.PUSH.IDENTITY_POOL_ID,
});

class PushHandler {
    _token: ?string;
    _endpointArn: ?string;

    async getPlatformEndpoint() {
        if (this._endpointArn) return this._endpointArn;
        const params = {
            PlatformApplicationArn: CONFIG.PUSH.APPLICATION_ARN,
            Token: uuid(),
            Attributes: { Token: this._token },
        };

        try {
            const sns = new AWS.SNS({ region: CONFIG.PUSH.REGION });
            const response = await sns.createPlatformEndpoint(params).promise();
            this._endpointArn = response.EndpointArn;
            if (__DEV__) {
                console.log('END_POINT_SRN', this._endpointArn);
            }
            return response.EndpointArn;
        } catch (error) {
            if (__DEV__) {
                console.error(error);
            }
            return undefined;
        }
    }

    onError = (error: any) => {
        if (__DEV__) {
            console.warn('PUSH ERROR:', error);
        }
    };

    onToken = (token: any) => {
        this._token = token.token;
        this.getPlatformEndpoint(token);
        if (__DEV__) {
            console.log('TOKEN', this._token);
        }
    };

    onNotification = (notification: any) => {
        if (__DEV__) {
            console.warn('NOTIFICATION:', notification);
        }
    };

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
