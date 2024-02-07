import axiosInstance from "../../Utils/Api/axios";
import { User } from "../../models";

/**
 * @param {number} userId
 * @returns {User}
 */
export const getUser = async (
  userId: number
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/" + userId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
