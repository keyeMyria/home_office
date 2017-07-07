// @flow
import { observable, computed } from 'mobx';
import BaseModel from '../models/BaseModel';

declare class ObservableMap<V> extends Map<string, V> {
    toJS(): {[string]: V},
    merge(values: Array<[string, V]> | {[string]: V} | Map<string, V>): void,
}

/**
 * Base class for the collections
 * @param {Object} $rootStore
 */
export default class BaseCollection<T: BaseModel> {
    $rootStore: any;
    _observableMap: ObservableMap<T> = observable.map({});
    static $model: BaseModel;

    constructor($rootStore: any) {
        this.$rootStore = $rootStore;
    }

    /**
     * Returns the value at the given key (or `undefined`).
     */
    get(id: string | number): T | void {
        const _id = String(id);
        return this._observableMap.get(_id);
    }

    /**
     * Sets the given key to value.
     * The provided key will be added to the map if it didn't exist yet.
     *
     * This also checks if value is instance of static $model
     */
    set(key: string | number, value: T): this {
        if (value instanceof this.constructor.$model) {
            const _id = String(key);
            this._observableMap.set(_id, value);
        } else {
            throw TypeError('`value` must be a instance of this.$model');
        }

        return this;
    }

    /**
     * Returns whether this collection has an entry with the provided key.
     *
     * Note that the presence of a key is an observable fact in itself.
     */
    has(key: string | number): boolean {
        const _id = String(key);
        return this._observableMap.has(_id);
    }

    /**
     * Removes all entries from this map.
     */
    clear(): void {
        return this._observableMap.clear();
    }

    /**
     * Deletes the given key and its value from the map
     */
    delete(key: string | number): boolean {
        const _id = String(key);
        return this._observableMap.delete(_id);
    }

    /**
     * Returns a new `Iterator` object that contains the __keys__ for each
     * element in the Map object in insertion order.
     */
    keys(): Iterator<string> {
        return this._observableMap.keys();
    }

    /**
     * Returns a new `Iterator` object that contains the __values__ for each
     * element in the Map object in insertion order.
     */
    values(): Iterator<T> {
        return this._observableMap.values();
    }

    /**
     * Computed property that returns a new `Array` that contains the __values__
     * for each element in the collection in insertion order.
     * @name valuesArray
     */
    @computed
    get valuesArray(): Array<T> {
        return Array.from(this._observableMap.values());
    }

    /**
     * Computed property that returns a new `Array` that contains the __keys__
     * for each element in the collection in insertion order.
     * @name keysArray
     */
    @computed
    get keysArray(): Array<string> {
        return Array.from(this._observableMap.keys());
    }

    /**
     * Returns a new Iterator object that contains an array of __[key, value]__
     * for each element in the Map object in insertion order.
     */
    entries(): Iterator<[string, T]> {
        return this._observableMap.entries();
    }

    /**
     * Returns a shallow plain object representation of this collection.
     */
    toJS(): {[string]: T} {
        return this._observableMap.toJS();
    }
}
