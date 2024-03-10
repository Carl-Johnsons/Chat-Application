import { axiosInstance } from "@/utils";
import { DefaultUser, User } from "@/models";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

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

const useGetUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    initialData: () => {
      return queryClient.getQueryData<User | null>(["users", userId]);
    },
  });
};

const useGetUsers = (userIds: number[]) => {
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: userIds.map((userId) => {
      return {
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
