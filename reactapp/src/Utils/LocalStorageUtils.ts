import { JwtToken } from "../Models";

const ACCESS_TOKEN = "acessToken";

type LocalStorageKey = typeof ACCESS_TOKEN;
type LocalStorageValue = {
  [ACCESS_TOKEN]: JwtToken;
};

export const setLocalStorageItem = (
  key: LocalStorageKey,
  value: LocalStorageValue[LocalStorageKey]
) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getLocalStorageItem = (
  key: LocalStorageKey
): LocalStorageValue[LocalStorageKey] | null => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const removeLocalStorageItem = (key: LocalStorageKey) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
