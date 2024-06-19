import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  userId: string;
}
const blockUser = async ({ userId, axiosInstance }: Props): Promise<void> => {
  const data = {
    blockUserId: userId,
  };
  const url = "http://localhost:5001/api/users/block";
  const response = await axiosInstance.post(url, data);
  return response.data;
};
const useBlockUser = () => {
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
      console.log("Block gòi nhe");
      
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
      console.error("Block user failed: " + err.message);
    },
  });
};
export { useBlockUser };
