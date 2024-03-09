import { axiosInstance } from "@/utils";
import { User } from "@/models";

/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (user: User): Promise<User | null> => {
  const url = "/api/Users/" + user.userId;
  const response = await axiosInstance.put(url, user);
  return response.data;
};
