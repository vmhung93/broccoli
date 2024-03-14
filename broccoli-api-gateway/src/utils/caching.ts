import NodeCache from "node-cache";

export class Caching {
    private _caching: NodeCache;

    constructor(stdTTL: number) {
        this._caching = new NodeCache({ stdTTL: stdTTL ?? 600 });
    }

    has = (key: string): boolean => {
        return this._caching.has(key);
    };

    store = (key: string, val: unknown): boolean => {
        return this._caching.set(key, val);
    };

    retrieve = (key: string): unknown => {
        return this._caching.get(key);
    };

    take = (key: string): unknown => {
        return this._caching.take(key);
    };

    remove = (key: string): number => {
        return this._caching.del(key);
    };

    flushAll = (): void => {
        return this._caching.flushAll();
    };
}
