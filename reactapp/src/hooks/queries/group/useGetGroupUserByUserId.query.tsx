import { axiosInstance } from "@/utils";
import { GroupUser } from "@/models";
import {
  QueryKey,
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * @param {number} userId
 * @returns
 */
const getGroupUserByUserId = async (
  userId: number
): Promise<GroupUser[] | null> => {
  const url = "/api/Group/GetGroupUserByUserId/" + userId;
  const response = await axiosInstance.get(url);
  return response.data;
};
/**
 * This query will get all the group that the current user are in
 * @param userId
 * @returns
 */
const useGetGroupUserByUserId = (
  userId: number,
  queryOptions: Omit<
    UseQueryOptions<GroupUser[] | null, unknown, GroupUser[] | null, QueryKey>,
    "queryKey" | "queryFn"
  > = {}
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...queryOptions,
    queryKey: ["groupList"],
    enabled: !!userId,
    queryFn: () => getGroupUserByUserId(userId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<GroupUser[] | null>(["groupList"]);
    },
  });
};

export { useGetGroupUserByUserId };
