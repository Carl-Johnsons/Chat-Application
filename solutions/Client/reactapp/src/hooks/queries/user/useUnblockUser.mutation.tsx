import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  userId: string;
}

export const unblockUser = async ({
    userId,
  axiosInstance,
}: Props): Promise<boolean | null> => {
  const url = "http://localhost:5001/api/users/unblock";
  const response = await axiosInstance.delete(url, {
    data: {
        userId,
    },
  });
  return response.status === 204;
};

const useUnblockUser = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    boolean | null,
    Error,
    {
      userId: string;
    },
    unknown
  >({
    mutationFn: ({ userId }) =>
      unblockUser({ userId, axiosInstance: protectedAxiosInstance }),
    onSuccess: () => {
      console.log("unblock user successfully");

      queryClient.invalidateQueries({
        queryKey: ["blockList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to unblock user! " + err.message);
    },
  });
};

export { useUnblockUser };