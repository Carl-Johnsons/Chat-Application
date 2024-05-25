import { protectedAxiosInstance } from "@/utils";
import { User } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (user: User): Promise<User | null> => {
  const url = "http://localhost:5001/api/users";
  const response = await protectedAxiosInstance.put(url, user);
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
        queryKey: ["users", data?.id],
        exact: true,
      });
      console.log("Update user successfully!");
    },
  });
};

export { useUpdateUser };
