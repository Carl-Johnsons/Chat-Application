import { axiosInstance } from "@/utils";

export const register = async (
  user: object
): Promise<[boolean | null, unknown]> => {
  try {
    const url = "/api/Auth/Register";
    const respone = await axiosInstance.post(url, user);
    if (respone.status !== 201) {
      throw new Error(respone.statusText);
    }
    return [true, null];
  } catch (error) {
    return [false, error];
  }
};
