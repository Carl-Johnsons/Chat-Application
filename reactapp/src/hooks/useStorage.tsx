const isBrowser = () => typeof window !== "undefined";

const useStorage = (key: string, storageObject: Storage | undefined) => {
  const getItem: () => any | null = () => {
    const storedValue = storageObject?.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return null;
  };
  const setItem = (value: any) => {
    if (!storageObject) {
      return;
    }
    if (!value) {
      return storageObject.removeItem(key);
    }
    storageObject.setItem(key, JSON.stringify(value));
  };
  const removeItem = () => {
    if (!storageObject) {
      return;
    }
    storageObject.removeItem(key);
  };
  return [getItem, setItem, removeItem] as const;
};
//window is undefined in the server
const useLocalStorage = (key: string) => {
  return useStorage(key, isBrowser() ? window.localStorage : undefined);
};

const useSessionStorage = (key: string) => {
  return useStorage(key, isBrowser() ? window.sessionStorage : undefined);
};

export { useLocalStorage, useSessionStorage };
