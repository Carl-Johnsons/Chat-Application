import { JwtToken } from "../models";

const ACCESS_TOKEN = "accessToken";
const IS_AUTHENTICATED = "isAuthenticated";

type LocalStorageKey = typeof ACCESS_TOKEN | typeof IS_AUTHENTICATED;
type LocalStorageValue = {
  [ACCESS_TOKEN]: JwtToken;
  [IS_AUTHENTICATED]: boolean;
};

export const setLocalStorageItem = (
  key: LocalStorageKey,
  value: LocalStorageValue[typeof key]
) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getLocalStorageItem = <T extends LocalStorageKey>(
  key: T
): LocalStorageValue[T] | null => {
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
