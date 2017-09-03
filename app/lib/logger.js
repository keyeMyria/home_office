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
            format.replace(/%s/g, () => args[argIndex++]), // eslint-disable-line no-plusplus
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
