import { JwtToken } from "../../models";
import axiosInstance from "../../utils/Api/axios";

export const refreshToken = async (): Promise<[JwtToken | null, unknown]> => {
  try {
    const url = "/api/Auth/Refresh";
    const respone = await axiosInstance.get(url);
    const newAccessToken: JwtToken = respone.data;
    return [newAccessToken, null];
  } catch (error) {
    return [null, error];
  }
};
