// @flow
import type { RootStore } from './../stores/index';

export default class BaseStore {
    rootStore: RootStore;

    setRootStore(rootStore: RootStore): this {
        this.rootStore = rootStore;
        if (typeof this.init === 'function') {
            this.init();
        }
        return this;
    }
}
