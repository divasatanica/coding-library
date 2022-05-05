class Storager implements Storage {
  private storage: Storage;
  constructor(storage: Storage = sessionStorage) {
    this.storage = storage;
  }

  hasItem(key: string) {
    const storaged = this.storage.getItem(key);
    if (storaged == null) {
      return false;
    }

    return true;
  }

  getItem(key: string) {
    const hasItem = this.hasItem(key);
    if (!hasItem) {
      return null
    }
    const storaged = this.storage.getItem(key)!;
    try {
      const result = JSON.parse(storaged);

      return result;
    } catch {
      return undefined;
    }
  }

  setItem(key: string, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  clear() {
    this.storage.clear();
  }

  get length() {
    return this.storage.length;
  }

  key(index: number) {
    return this.storage.key(index);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}

export {
  Storager
}