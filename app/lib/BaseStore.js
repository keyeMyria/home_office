// @flow

export default class BaseStore {
    rootStore: *;

    setRootStore(rootStore: *): this {
        this.rootStore = rootStore;
        if (typeof this.init === 'function') {
            this.init();
        }
        return this;
    }
}
