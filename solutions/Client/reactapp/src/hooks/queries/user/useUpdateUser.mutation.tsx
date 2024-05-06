import { axiosInstance } from "@/utils";
import { User } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (user: User): Promise<User | null> => {
  const url = "/api/Users/" + user.userId;
  const response = await axiosInstance.put(url, user);
  return response.data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User | null, Error, { user: User }, unknown>({
    mutationFn: ({ user }) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["currentUser"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["users", data?.userId],
        exact: true,
      });
      console.log("Update user successfully!");
    },
  });
};

export { useUpdateUser };
