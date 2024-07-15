import { AxiosProps, User } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";
import { UpdateUserInputDTO } from "@/models/DTOs";
import { toast } from "react-toastify";

interface Props extends AxiosProps {
  user: UpdateUserInputDTO;
}

export const updateUser = async ({
  user,
  axiosInstance,
}: Props): Promise<User | null> => {
  const url = "http://localhost:5001/api/users";
  const formData = new FormData();
  // Cast user to a more flexible type
  const userAsAny = user as { [key: string]: any };
  for (const key in userAsAny) {
    if (userAsAny.hasOwnProperty(key)) {
      formData.append(key, userAsAny[key]);
    }
  }
  const response = await axiosInstance.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<User | null, Error, { user: UpdateUserInputDTO }, unknown>(
    {
      mutationFn: ({ user }) =>
        toast.promise(
          updateUser({ user, axiosInstance: protectedAxiosInstance }),
          {
            pending: "Đang cập nhật...",
            success: "Cập nhật thành công",
            error: "Cập nhật thất bại",
          }
        ),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["users", data?.id],
          exact: true,
        });
      },
    }
  );
};

export { useUpdateUser };
