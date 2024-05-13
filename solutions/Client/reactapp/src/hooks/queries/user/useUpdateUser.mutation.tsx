import { axiosInstance } from "@/utils";
import { User } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "hooks/useStorage";

/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (
  user: User,
  accessToken: string
): Promise<User | null> => {
  const url = "http://localhost:5001/api/users";
  const response = await axiosInstance.put(url, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const useUpdateUser = () => {
  const [getAccessToken] = useLocalStorage("access_token");
  const queryClient = useQueryClient();
  return useMutation<User | null, Error, { user: User }, unknown>({
    mutationFn: ({ user }) => updateUser(user, getAccessToken() as string),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", data?.id],
        exact: true,
      });
      console.log("Update user successfully!");
    },
  });
};

export { useUpdateUser };
