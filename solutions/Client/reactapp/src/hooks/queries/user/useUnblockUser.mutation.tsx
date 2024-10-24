import { IDENTITY_SERVER_URL } from "@/constants/url.constant";
import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  unblockUserId: string;
}

export const unblockUser = async ({
  unblockUserId,
  axiosInstance,
}: Props): Promise<boolean | null> => {
  const url = `${IDENTITY_SERVER_URL}/api/users/unblock`;
  const response = await axiosInstance.delete(url, {
    data: {
      unblockUserId,
    },
  });
  return response.status === 204;
};

const useUnblockUser = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    boolean | null,
    Error,
    {
      unblockUserId: string;
    },
    unknown
  >({
    mutationFn: ({ unblockUserId }) =>
      unblockUser({ unblockUserId, axiosInstance: protectedAxiosInstance }),
    onSuccess: () => {
      console.log("unblock user successfully");

      queryClient.invalidateQueries({
        queryKey: ["blockList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to unblock user! " + err.message);
    },
  });
};

export { useUnblockUser };