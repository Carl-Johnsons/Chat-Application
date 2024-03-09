import { Group } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * @param {number} groupId
 * @returns
 */
export const getGroup = async (
  groupId: number
): Promise<Group | null> => {
    const url = "/api/Group/" + groupId;
    const response = await axiosInstance.get(url);
    return response.data;
};
