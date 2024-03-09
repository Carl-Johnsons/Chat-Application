import { JwtToken } from "@/models";
import { axiosInstance } from "@/utils";

export const login = async (
  phoneNumber: string,
  password: string
): Promise<JwtToken | null> => {
  const url = "/api/Auth/Login";
  const respone = await axiosInstance.post(url, { phoneNumber, password });
  return respone.data;
};
