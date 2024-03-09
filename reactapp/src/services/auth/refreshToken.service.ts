import { axiosInstance } from "@/utils";
import { JwtToken } from "models/JwtToken";

export const refreshToken = async (): Promise<JwtToken | null> => {
  const url = "/api/Auth/Refresh";
  const respone = await axiosInstance.get(url);
  const newAccessToken: JwtToken = respone.data;
  return newAccessToken;
};
