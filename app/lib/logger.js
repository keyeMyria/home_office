// @flow

function log(...args: Array<any>): void {
    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log(...args);
    }
}

function warn(...args: Array<any>): void {
    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn(...args);
    }
}

function error(...args: Array<any>): void {
    if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error(...args);
    }
}

export default {
    log,
    error,
    warn,
};
