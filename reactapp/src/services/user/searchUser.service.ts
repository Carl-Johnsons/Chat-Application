import { axiosInstance } from "@/utils";
import { User } from "@/models";

export const searchUser = async (
  phoneNumber: string
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/Search/" + phoneNumber;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
