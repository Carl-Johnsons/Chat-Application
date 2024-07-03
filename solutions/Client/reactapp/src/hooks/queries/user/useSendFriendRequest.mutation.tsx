import { AxiosProps, FriendRequest } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signalRSendFriendRequest, useAxios, useSignalREvents } from "@/hooks";
import { toast } from "react-toastify";

interface Props extends AxiosProps {
  receiverId: string;
}

const sendFriendRequest = async ({
  receiverId,
  axiosInstance,
}: Props): Promise<FriendRequest | null> => {
  const data = {
    receiverId: receiverId,
    content: "Hello",
  };
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useSendFriendRequest = () => {
  const { invokeAction } = useSignalREvents();

  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    FriendRequest | null,
    Error,
    { receiverId: string },
    unknown
  >({
    mutationFn: ({ receiverId }) =>
      sendFriendRequest({ receiverId, axiosInstance: protectedAxiosInstance }),
    onSuccess: (fr) => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
      if (!fr) {
        return;
      }
      invokeAction(signalRSendFriendRequest(fr));
      toast.success("Gửi lời mời kết bạn thành công");
    },
    onError: (err) => {
      console.error("Failed to send friend request" + err);
      toast.error("Gửi lời mời kết bạn thất bại");
    },
  });
};

export { useSendFriendRequest };
