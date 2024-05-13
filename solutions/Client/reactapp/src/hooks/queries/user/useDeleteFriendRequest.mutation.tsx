import { axiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "hooks/useStorage";

/**
 * @param friendRequestId
 * @returns
 */
export const deleteFriendRequest = async (
  friendRequestId: string,
  accessToken: string
): Promise<boolean | null> => {
  const data = {
    friendRequestId,
  };
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await axiosInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  });
  return response.status === 204;
};

const useDeleteFriendRequest = () => {
  const [getAccessToken] = useLocalStorage("access_token");
  const queryClient = useQueryClient();
  return useMutation<
    boolean | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) =>
      deleteFriendRequest(frId, getAccessToken() as string),
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
