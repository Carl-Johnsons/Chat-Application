import { AxiosProps, User } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";
import { UpdateUserInputDTO } from "@/models/DTOs";

interface Props extends AxiosProps {
  user: UpdateUserInputDTO;
}

export const updateUser = async ({
  user,
  axiosInstance,
}: Props): Promise<User | null> => {
  const url = "http://localhost:5001/api/users";

  const response = await axiosInstance.put(url, user);
  return response.data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<User | null, Error, { user: UpdateUserInputDTO }, unknown>(
    {
      mutationFn: ({ user }) =>
        updateUser({ user, axiosInstance: protectedAxiosInstance }),
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
    }
  );
};

export { useUpdateUser };
