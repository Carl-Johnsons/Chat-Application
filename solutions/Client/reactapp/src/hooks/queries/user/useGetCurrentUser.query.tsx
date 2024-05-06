import { axiosInstance } from "@/utils";
import { User } from "@/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "currentUser";

const getUserProfile = async (): Promise<User | null> => {
  const url = "/api/Users/Me";
  const response = await axiosInstance.get(url);
  const user: User = response.data;
  user.isOnline = false;
  return user;
};

const useGetCurrentUser = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getUserProfile,
    initialData: () => {
      return queryClient.getQueryData<User | null>([QUERY_KEY]);
    },
  });
};

export { useGetCurrentUser };
