export default class BaseStore {
    rootStore: any;

    setRootStore(rootStore) {
        this.rootStore = rootStore;
        return this;
    }
}
