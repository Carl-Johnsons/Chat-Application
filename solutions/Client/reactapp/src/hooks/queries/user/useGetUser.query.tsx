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
const getUser = async (userId: string): Promise<User | null> => {
  const url = "http://localhost:5001/api/users";

  const response = await axiosInstance.get(url, {
    params: {
      id: userId,
    },
    paramsSerializer: {},
  });
  const user: User = { ...DefaultUser, ...response.data };
  return user;
};

const useGetUser = (
  userId: string,
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
  userIds: string[],
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
