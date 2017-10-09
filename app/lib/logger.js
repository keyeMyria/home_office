// @flow
/* eslint-disable no-console, no-plusplus, no-param-reassign */

function log(...args: Array<any>): void {
    if (__DEV__) {
        console.log(...args);
    }
}

function warn(...args: Array<any>): void {
    if (__DEV__) {
        console.warn(...args);
    }
}

function error(...args: Array<any>): void {
    if (__DEV__) {
        if (args[0] instanceof Error) {
            args[0].framesToPop = 1;
        }
        console.error(...args);
    }
}

/**
 * Verifica se uma condição é verdadeira, caso contrario lança uma exceção
 * @example
 * ```javascript
 *     logger.assert(false, 'Sempre vai lançar uma exceção: %s', 'Nome da Exceção')
 * ```
 */
function assert(condition: boolean, format: string, ...args: Array<mixed>) {
    if (__DEV__) {
        if (condition) return;

        if (typeof format !== 'string') {
            throw new Error('"logger.assert" needs a format string');
        }
        let argIndex = 0;
        const newError = new Error(
            format.replace(/%s/g, () => String(args[argIndex++])),
        );
        newError.name = 'AssertError';
        newError.framesToPop = 1;
        throw newError;
    }
}


export default {
    log,
    error,
    warn,
    assert,
};
