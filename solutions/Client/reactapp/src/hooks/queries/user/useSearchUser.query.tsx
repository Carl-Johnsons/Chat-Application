import { useAxios } from "@/hooks";
import { AxiosProps, User } from "@/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  searchValue: string;
}

const searchUser = async ({
  searchValue,
  axiosInstance,
}: Props): Promise<User[] | null> => {
  const params = {
    value: searchValue,
  };
  const url = "http://localhost:5001/api/users/search";
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const useSearchUser = (searchValue: string) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useQuery({
    queryKey: ["users", "search", searchValue],
    queryFn: () =>
      searchUser({ searchValue, axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<User[] | null>([
        "users",
        "search",
        searchValue,
      ]);
    },
  });
};

export default useSearchUser;
