import { IDENTITY_SERVER_URL } from "@/constants/url.constant";
import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Props extends AxiosProps {
  userId: string;
}
const blockUser = async ({ userId, axiosInstance }: Props): Promise<void> => {
  const data = {
    blockUserId: userId,
  };
  const url = `${IDENTITY_SERVER_URL}/api/users/block`;
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
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
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
        queryKey: ["blockList"],
        exact: true,
      });
      toast.success("Chặn người dùng thành công");
    },
    onError: (err) => {
      console.error("Block user failed: " + err.message);
      toast.error("Chặn người dùng thất bại");
    },
  });
};
export { useBlockUser };
