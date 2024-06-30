import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  userId: string;
}
const blockUser = async ({ userId, axiosInstance }: Props): Promise<UserBlock[]> => {
  const data = {
    blockUserId: userId,
  };
  const url = "http://localhost:5001/api/users/block";
};
const useGetBlockList = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    void,
    Error,
    {
      userId: string;
    },
    unknown
  >({
    mutationFn: ({ userId }) => {
      return blockUser({
        userId: userId,
        axiosInstance: protectedAxiosInstance,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversationList"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["friendList"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["userBlockList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Add friend failed: " + err.message);
    },
  });
};
export { useGetBlockList };
