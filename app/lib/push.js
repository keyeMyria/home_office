// @flow
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import EventEmitter from 'react-native-eventemitter';

import CONFIG from './../../config';
import logger from './logger';
import httpClient from './HttpClient';

type AttributesResponseData = {
    Attributes: {
        Token: string,
        CustomUserData: string,
        Enabled: string,
    },
};

// Configura credenciais da AWS
AWS.config.region = CONFIG.PUSH.REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: CONFIG.PUSH.IDENTITY_POOL_ID,
});

const SNS = new AWS.SNS({ region: CONFIG.PUSH.REGION });
const None = '-- None --';

class PushHandler {
    _token: ?string;
    _endpointArn: ?string;
    _registerDone: boolean = false;

    constructor() {
        EventEmitter.on('auth.login_success', ({ payload }) => {
            this.registerWithSNS(payload.endpointArn);
        });

        EventEmitter.on('auth.reload_endpoint_arn', ({ endpointArn }) => {
            this.registerWithSNS(endpointArn);
        });
    }


    get APPLICATION_ARN(): string {
        const platform = Platform.OS;
        return CONFIG.PUSH.APPLICATION_ARN[platform];
    }

    async registerWithSNS(endpoint: ?string) {
        if (!this._token) {
            this._endpointArn = endpoint || null;
            return;
        }
        if (endpoint === None && this._endpointArn === undefined) {
            return;
        }
        if (endpoint !== None) {
            this._endpointArn = endpoint;
        }

        let endpointArn = this._endpointArn;
        const token = this._token;

        let updateNeeded = false;
        let createNeeded = endpointArn === null;

        if (createNeeded) {
            logger.log('[SNS] No platform endpoint ARN is stored; need to call createEndpoint');
            endpointArn = await this.createPlatformEndpoint();
            createNeeded = false;
        }

        logger.log('[SNS] Retrieving platform endpoint data...');
        try {
            const { Attributes }: AttributesResponseData = await SNS.getEndpointAttributes({
                EndpointArn: endpointArn,
            }).promise();
            updateNeeded =
                Attributes.Token !== token || Attributes.Enabled.toLowerCase() !== 'true';
        } catch (error) {
            if (error.code === 'NotFound') {
                logger.log(
                    `[SNS] We had a stored ARN: "${endpointArn}", but the platform endpoint associated with it disappeared. Recreate it.`,
                );
                createNeeded = true;
            } else {
                logger.error(error);
            }
        }

        if (createNeeded) {
            endpointArn = await this.createPlatformEndpoint();
        }

        logger.log(`[SNS] updateNeeded = ${updateNeeded}`);

        if (updateNeeded) {
            logger.log(`[SNS] Updating platform endpoint: "${endpointArn}"`);
            SNS.setEndpointAttributes({
                EndpointArn: endpointArn,
                Attributes: {
                    Token: token,
                    Enabled: 'true',
                },
            }).promise();
        }
    }

    async createPlatformEndpoint() {
        let endpointArn: ?string = null;
        const token = this._token;
        try {
            logger.log(`[SNS] Creating platform endpoint with token: "${token}"`);
            const params = {
                PlatformApplicationArn: this.APPLICATION_ARN,
                Token: this._token,
                Attributes: { Token: this._token, Enabled: 'true' },
            };
            const { EndpointArn } = await SNS.createPlatformEndpoint(params).promise();
            logger.log(`[SNS] platform endpoint created: "${EndpointArn}"`);
            endpointArn = EndpointArn;
        } catch (error) {
            const message: string = error.message;
            logger.log(`[SNS] Exception message: ${message}`);
            const regex = /.*Endpoint (arn:aws:sns[^ ]+) already exists with the same token/g;
            const m = regex.exec(message);
            if (m) {
                endpointArn = m[1];
            } else {
                throw error;
            }
        }
        await this.storeEndpointArn(endpointArn);
        return endpointArn;
    }

    async storeEndpointArn(endpointArn: string) {
        try {
            httpClient.put('perfil/arn', { arn: endpointArn });
        } catch (error) {
            logger.error(error);
        }
    }

    onError = (error: any) => {
        logger.log('[SNS] PushHandler Error');
        logger.error(error);
    };

    onToken = (token: any) => {
        this._token = token.token;
        this.registerWithSNS(None);
        logger.log(`[SNS] Device Token: "${token.token}"`);
    };

    onNotification = (notification: any) => {
        logger.log('[SNS] Notification received', notification);
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
