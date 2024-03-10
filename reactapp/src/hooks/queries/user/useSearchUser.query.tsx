import { axiosInstance } from "@/utils";
import { User } from "@/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const searchUser = async (phoneNumber: string): Promise<User | null> => {
  const url = "/api/Users/Search/" + phoneNumber;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useSearchUser = (phoneNumber: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["users", "search", phoneNumber],
    queryFn: () => searchUser(phoneNumber),
    initialData: () => {
      return queryClient.getQueryData<User | null>([
        "users",
        "search",
        phoneNumber,
      ]);
    },
  });
};

export default useSearchUser;
