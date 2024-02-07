import { User } from "../../models";
import axiosInstance from "../../Utils/Api/axios";

/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (
  user: User
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/" + user.userId;
    const response = await axiosInstance.put(url, user);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
