import { protectedAxiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @param friendRequestId
 * @returns
 */
export const deleteFriendRequest = async (
  friendRequestId: string
): Promise<boolean | null> => {
  const data = {
    friendRequestId,
  };
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await protectedAxiosInstance.delete(url, {
    data,
  });
  return response.status === 204;
};

const useDeleteFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    boolean | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) => deleteFriendRequest(frId),
    onSuccess: () => {
      console.log("del friend request successfully");
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to del friend request: " + err.message);
    },
  });
};

export { useDeleteFriendRequest };
