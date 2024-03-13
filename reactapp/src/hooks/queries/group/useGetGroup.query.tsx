import { Group } from "@/models";
import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * @param {number} groupId
 * @returns
 */
const getGroup = async (groupId: number): Promise<Group | null> => {
  const url = "/api/Group/" + groupId;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetGroup = (groupId: number | undefined) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["groups", groupId],
    enabled: !!groupId,
    queryFn: () => getGroup(groupId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<Group | null>(["groups", groupId]);
    },
  });
};

export { useGetGroup };
