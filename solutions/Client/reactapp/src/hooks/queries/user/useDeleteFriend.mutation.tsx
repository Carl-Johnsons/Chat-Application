import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Props extends AxiosProps {
  friendId: string;
}

export const deleteFriend = async ({
  friendId,
  axiosInstance,
}: Props): Promise<boolean | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await axiosInstance.delete(url, {
    data: {
      friendId,
    },
  });
  return response.status === 204;
};

const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    boolean | null,
    Error,
    {
      friendId: string;
    },
    unknown
  >({
    mutationFn: ({ friendId }) =>
      deleteFriend({ friendId, axiosInstance: protectedAxiosInstance }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendList"],
        exact: true,
      });
      toast.success("Xóa bạn thành công");
    },
    onError: (err) => {
      console.error("Failed to delete friend! " + err.message);
      toast.success("Xóa bạn thất bại");
    },
  });
};

export { useDeleteFriend };
