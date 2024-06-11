import { useState } from "react";

const isBrowser = () => typeof window !== "undefined";

const useStorage = (key: string, storageObject: Storage | undefined) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (storageObject) {
      const item = storageObject.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  });

  const setItem = (value: unknown) => {
    if (storageObject) {
      if (value === null || value === undefined) {
        storageObject.removeItem(key);
        setStoredValue(null);
      } else {
        storageObject.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      }
    }
  };

  const removeItem = () => {
    if (storageObject) {
      storageObject.removeItem(key);
      setStoredValue(null);
    }
  };

  return [storedValue, setItem, removeItem] as const;
};

const useLocalStorage = (key: string) => {
  return useStorage(key, isBrowser() ? window.localStorage : undefined);
};

const useSessionStorage = (key: string) => {
  return useStorage(key, isBrowser() ? window.sessionStorage : undefined);
};

export { useLocalStorage, useSessionStorage };
