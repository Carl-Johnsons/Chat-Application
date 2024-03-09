import { axiosInstance } from "@/utils";
import { User } from "@/models";

export const getUserProfile = async (): Promise<User | null> => {
  const url = "/api/Users/Me";
  const response = await axiosInstance.get(url);
  const user: User = response.data;
  user.isOnline = false;
  return user;
};
