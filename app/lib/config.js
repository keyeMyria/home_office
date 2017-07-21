// @flow
import _ from 'lodash';
import CONFIG from './../../config';

/**
 * Business logic to retrieve a configuration key
 *
 * Key in format: @domain:key:key
 * for now we are string the @domain part
 * in the future we could do, '@alguma-escola:login:bg_img'
 *
 * defaultValue is the value that is returned if no key match the request
 */
export function getConfig(key: string, defaultValue: ?any): any {
    const path = key.split(':').slice(1).map(s => s.toUpperCase()).join('.');
    return _.get(CONFIG, path, defaultValue);
}

/**
 * Set a config key at runtime
 */
export function setConfig(key: string, value: any): void {
    // eslint-disable-line
    throw new Error('Not Implemented');
}
