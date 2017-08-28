export default class BaseStore {
    rootStore: any;

    setRootStore(rootStore) {
        this.rootStore = rootStore;
        if (typeof this.init === 'function') {
            this.init();
        }
        return this;
    }
}
