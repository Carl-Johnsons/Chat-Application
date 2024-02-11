import axiosInstance from "../../utils/Api/axios";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/LocalStorageUtils";

export const logout = async (): Promise<[number | null, unknown]> => {
  try {
    const url = "/api/Auth/Logout";
    const respone = await axiosInstance.post(url);
    removeLocalStorageItem("accessToken");
    setLocalStorageItem("isAuthenticated", false);
    return [respone.status, null];
  } catch (error) {
    return [null, error];
  }
};
