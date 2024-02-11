import { User } from "../../models";
import axiosInstance from "../../utils/Api/axios";

export const getUserProfile = async (): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/Me";
    const response = await axiosInstance.get(url);

    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
