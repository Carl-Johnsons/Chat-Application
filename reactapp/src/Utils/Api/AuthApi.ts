import { JwtToken, RefreshToken } from "../../Models";
import { setLocalStorageItem } from "../LocalStorageUtils";
import axiosInstance from "./axios";

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
export const refreshToken = async (
  token: RefreshToken
): Promise<[JwtToken | null, unknown]> => {
  try {
    const url = "/api/Auth/RefreshToken";
    const respone = await axiosInstance.post(url, token);
    const newAccessToken: JwtToken = respone.data;
    return [newAccessToken, null];
  } catch (error) {
    return [null, error];
  }
};
