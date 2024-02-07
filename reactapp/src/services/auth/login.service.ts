import { JwtToken } from "../../models";
import axiosInstance from "../../Utils/Api/axios";
import { setLocalStorageItem } from "../../Utils/LocalStorageUtils";

export const login = async (
  phoneNumber: string,
  password: string
): Promise<[JwtToken | null, unknown]> => {
  try {
    const url = "/api/Auth/Login";
    const respone = await axiosInstance.post(url, { phoneNumber, password });
    const jwtToken: JwtToken = respone.data;
    if (jwtToken) {
      setLocalStorageItem("accessToken", jwtToken);
      return [jwtToken, null];
    }
    return [null, null];
  } catch (error) {
    return [null, error];
  }
};
