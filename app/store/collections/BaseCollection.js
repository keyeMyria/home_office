// @flow

export default class BaseCollection {
    $rootStore: any;
    $mapName: string = '';

    constructor($rootStore: any) {
        this.$rootStore = $rootStore;
    }

    get map(): ?Map<string, any> {
        if (this.$mapName) {
            // $FlowFixMe
            return this[this.$mapName] || null;
        }
        return null;
    }

    // Proxy Methods
    get(id: string | number) {
        return this.map && this.map.get(String(id));
    }

    set(id: string | number, item: any) {
        return this.map && this.map.set(String(id), item);
    }

    has(id: string | number) {
        return this.map && this.map.set(String(id));
    }

    clear() {
        return this.map && this.map.clear();
    }

    delete(id: string | number) {
        return this.map && this.map.delete(String(id));
    }

    keys() {
        return this.map && this.map.keys();
    }

    values() {
        return this.map && this.map.values();
    }

    entries() {
        return this.map && this.map.entries();
    }

    toJS() {
        // $FlowFixMe
        return this.map && this.map.joJS();
    }
}
