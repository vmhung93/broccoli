import NodeCache from "node-cache";

class Caching {
    private _caching: NodeCache;

    constructor(stdTTL: number) {
        this._caching = new NodeCache({ stdTTL: stdTTL ?? 600 });
    }

    public has = (key: string): boolean => {
        return this._caching.has(key);
    };

    public store = (key: string, val: unknown): boolean => {
        return this._caching.set(key, val);
    };

    public retrieve = (key: string): unknown => {
        return this._caching.get(key);
    };

    public take = (key: string): unknown => {
        return this._caching.take(key);
    };

    public remove = (key: string): number => {
        return this._caching.del(key);
    };

    public flushAll = (): void => {
        return this._caching.flushAll();
    };
}

export default Caching;
