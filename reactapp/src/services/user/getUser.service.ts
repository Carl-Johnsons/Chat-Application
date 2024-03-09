import { axiosInstance } from "@/utils";
import { DefaultUser, User } from "@/models";

/**
 * @param {number} userId
 * @returns {User}
 */
export const getUser = async (userId: number): Promise<User | null> => {
  const url = "/api/Users/" + userId;
  const response = await axiosInstance.get(url);
  const user: User = { ...DefaultUser, ...response.data };
  return user;
};
