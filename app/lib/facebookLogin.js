// @flow
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import logger from './logger';
import httpClient from './HttpClient';

const FACEBOOK_AUTH_URL = 'usuarios/signin-mobile';

class FacebookLogin {
    _permissions: Array<string>;

    constructor() {
        this.setPermissions(['public_profile', 'email']);
    }

    setPermissions(permissions: Array<string>) {
        this._permissions = permissions;
    }

    async login(): Promise<?string> {
        try {
            const result = await LoginManager.logInWithReadPermissions(this._permissions);
            if (result.isCancelled) {
                logger.warn('FACEBOOK - LOGIN CANCELLED');
                return null;
            }
            const tokenResponse = await AccessToken.getCurrentAccessToken();
            if (tokenResponse) {
                logger.warn('FACEBOOK - TOKEN:', tokenResponse.accessToken);
                return tokenResponse.accessToken;
            }
            return null;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    async sendTokenToServer(token: string, celular?: string): Promise<?string> {
        try {
            if (celular) {
                const response = await httpClient.put(FACEBOOK_AUTH_URL, { token, celular });
                return response.data.token;
            }
            const response = await httpClient.put(FACEBOOK_AUTH_URL, { token });
            return response.data.token;
        } catch (error) {
            logger.warn(error);
            return null;
        }
    }
}

const facebookLogin = new FacebookLogin();
export default facebookLogin;
