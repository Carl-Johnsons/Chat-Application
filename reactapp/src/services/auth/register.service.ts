import { axiosInstance } from "@/utils";

export const register = async (user: object): Promise<boolean> => {
  const url = "/api/Auth/Register";
  const respone = await axiosInstance.post(url, user);
  if (respone.status !== 201) {
    return false;
  }
  return true;
};
