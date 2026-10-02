type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private ttl: number;
  private maxSize: number;

  constructor(ttlMs: number, maxSize: number = 100) {
    this.ttl = ttlMs;
    this.maxSize = maxSize;
  }

  set(key: string, value: T) {
    if (this.store.size >= this.maxSize) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }
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
