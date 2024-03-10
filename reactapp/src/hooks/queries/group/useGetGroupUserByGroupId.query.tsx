import { GroupUser } from "@/models";
import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * @param {number} groupId
 * @returns
 */
const getGroupUserByGroupId = async (
  groupId: number
): Promise<GroupUser[] | null> => {
  const url = "/api/Group/GetGroupUserByGroupId/" + groupId;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetGroupUserByGroupId = (groupId: number | undefined) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["groups", groupId, "users"],
    enabled: !!groupId,
    queryFn: () => getGroupUserByGroupId(groupId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<GroupUser[] | null>([
        "groups",
        groupId,
        "users",
      ]);
    },
  });
};

export { useGetGroupUserByGroupId };
