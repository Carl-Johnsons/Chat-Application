import { protectedAxiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteFriend = async (
  friendId: string
): Promise<boolean | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await protectedAxiosInstance.delete(url, {
    data: {
      friendId,
    },
  });
  return response.status === 204;
};

const useDeleteFriend = () => {
  const queryClient = useQueryClient();
  return useMutation<
    boolean | null,
    Error,
    {
      friendId: string;
    },
    unknown
  >({
    mutationFn: ({ friendId }) => deleteFriend(friendId),
    onSuccess: () => {
      console.log("delete friend successfully");

      queryClient.invalidateQueries({
        queryKey: ["friendList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to delete friend! " + err.message);
    },
  });
};

export { useDeleteFriend };
