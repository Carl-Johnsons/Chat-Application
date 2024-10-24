import { IDENTITY_SERVER_URL } from "@/constants/url.constant";
import { useAxios } from "@/hooks";
import { AxiosProps, DefaultUser, User } from "@/models";
import {
  QueryKey,
  UseQueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface Props extends AxiosProps {
  userId: string;
}

const getUser = async ({
  userId,
  axiosInstance,
}: Props): Promise<User | null> => {
  const url = `${IDENTITY_SERVER_URL}/api/users`;

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
  const { protectedAxiosInstance } = useAxios();
  return useQuery({
    ...queryOptions,
    queryKey: ["users", userId],
    queryFn: () => getUser({ userId, axiosInstance: protectedAxiosInstance }),
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
  const { protectedAxiosInstance } = useAxios();
  const queries = useQueries({
    queries: userIds.map((userId) => {
      return {
        ...queryOptions,
        queryKey: ["users", userId],
        queryFn: () =>
          getUser({ userId, axiosInstance: protectedAxiosInstance }),
        initialData: () => {
          return queryClient.getQueryData<User | null>(["users", userId]);
        },
      };
    }),
  });
  return queries;
};
export { useGetUser, useGetUsers };
