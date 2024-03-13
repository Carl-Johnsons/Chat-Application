import { axiosInstance } from "@/utils";
import { DefaultUser, User } from "@/models";
import {
  QueryKey,
  UseQueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * @param {number} userId
 * @returns {User}
 */
const getUser = async (userId: number): Promise<User | null> => {
  const url = "/api/Users/" + userId;
  const response = await axiosInstance.get(url);
  const user: User = { ...DefaultUser, ...response.data };
  return user;
};

const useGetUser = (
  userId: number,
  queryOptions: Omit<
    UseQueryOptions<User | null, unknown, User | null, QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...queryOptions,
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    initialData: () => {
      return queryClient.getQueryData<User | null>(["users", userId]);
    },
  });
};

const useGetUsers = (
  userIds: number[],
  queryOptions: Omit<
    UseQueryOptions<User | null, unknown, User | null, QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: userIds.map((userId) => {
      return {
        ...queryOptions,
        queryKey: ["users", userId],
        queryFn: () => getUser(userId),
        initialData: () => {
          return queryClient.getQueryData<User | null>(["users", userId]);
        },
      };
    }),
  });
  return queries;
};
export { useGetUser, useGetUsers };
