const STORAGE_PREFIX = "app";

class StorageService {
  private getKey(key: string): string {
    return `${STORAGE_PREFIX}:${key}`;
  }

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.getKey(key), serialized);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(this.getKey(key));
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(`${STORAGE_PREFIX}:`)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}

export const storage = new StorageService();
