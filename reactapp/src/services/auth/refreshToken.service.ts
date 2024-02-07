import { RefreshToken, JwtToken } from "../../models";
import axiosInstance from "../../Utils/Api/axios";

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
