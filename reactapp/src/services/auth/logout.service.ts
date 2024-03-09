import { axiosInstance } from "@/utils";

export const logout = async (): Promise<number> => {
  const url = "/api/Auth/Logout";
  const respone = await axiosInstance.post(url);
  return respone.status;
};
