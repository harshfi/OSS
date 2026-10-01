type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private ttl: number;

  constructor(ttlMs: number) {
    this.ttl = ttlMs;
  }

  set(key: string, value: T) {
    this.store.set(key, { data: value, timestamp: Date.now() });
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }
}

export const issueCache = new Cache<any>(10 * 60 * 1000); // 10 minutes
