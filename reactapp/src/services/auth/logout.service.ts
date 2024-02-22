import { axiosInstance } from "@/utils";

export const logout = async (): Promise<[number | null, unknown]> => {
  try {
    const url = "/api/Auth/Logout";
    const respone = await axiosInstance.post(url);
    return [respone.status, null];
  } catch (error) {
    return [null, error];
  }
};
