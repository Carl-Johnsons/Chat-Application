import { axiosInstance } from "@/utils";
import { User } from "@/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const searchUser = async (searchValue: string): Promise<User[] | null> => {
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
  return useQuery({
    queryKey: ["users", "search", searchValue],
    queryFn: () => searchUser(searchValue),
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
