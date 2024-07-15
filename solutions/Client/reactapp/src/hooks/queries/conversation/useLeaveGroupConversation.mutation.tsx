import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useGlobalState } from "@/hooks";

interface Props {
  groupConversationId: string;
}

interface FetchProps extends Props, AxiosProps {}

const leaveGroupConversation = async ({
  groupConversationId,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/conversation/group/leave";
  const data = {
    groupConversationId,
  };
  const response = await axiosInstance.delete(url, {
    data,
  });
  return response.data;
};

const useLeaveGroupConversation = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const [, setActiveConversationId] = useGlobalState("activeConversationId");
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ groupConversationId }: Props) =>
      leaveGroupConversation({
        groupConversationId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
      setActiveConversationId("");
    },
    onError: (err) => {
      console.error("Failed to leave group: " + err.message);
    },
  });
  return mutation;
};

export { useLeaveGroupConversation };
