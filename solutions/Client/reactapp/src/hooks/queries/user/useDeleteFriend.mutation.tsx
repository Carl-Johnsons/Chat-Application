import { axiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";

export const deleteFriend = async (
  userId: string,
  friendId: string
): Promise<boolean | null> => {
  const url = "/api/Users/RemoveFriend/" + userId + "/" + friendId;
  const response = await axiosInstance.delete(url);
  return response.status === 204;
};

const useDeleteFriend = () => {
  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<
    boolean | null,
    Error,
    {
      friendId: string;
    },
    unknown
  >({
    mutationFn: ({ friendId }) => deleteFriend(currentUser?.id ?? "", friendId),
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
