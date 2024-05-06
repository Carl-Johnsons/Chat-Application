import { axiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";

/**
 * - Sender is the who send the friend request
 * - Recevier is the who accept the friend request (current user)
 * @param senderId
 * @param receiverId
 * @returns
 */
export const deleteFriendRequest = async (
  senderId: number,
  receiverId: number
): Promise<boolean | null> => {
  const url = "/api/Users/RemoveFriendRequest/" + senderId + "/" + receiverId;
  const response = await axiosInstance.delete(url);
  return response.status === 204;
};

const useDeleteFriendRequest = () => {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<
    boolean | null,
    Error,
    {
      senderId: number;
    },
    unknown
  >({
    mutationFn: ({ senderId }) =>
      deleteFriendRequest(senderId, currentUser?.userId ?? -1),
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
