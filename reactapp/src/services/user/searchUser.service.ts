import { axiosInstance } from "@/utils";
import { User } from "@/models";

export const searchUser = async (phoneNumber: string): Promise<User | null> => {
  const url = "/api/Users/Search/" + phoneNumber;
  const response = await axiosInstance.get(url);
  return response.data;
};
