import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios, useGlobalState } from "@/hooks";

interface Props {
  groupConversationId: string;
}

interface FetchProps extends Props, AxiosProps {}

const disbandGroupConversation = async ({
  groupConversationId,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/conversation/group";
  const data = {
    groupConversationId,
  };
  const response = await axiosInstance.delete(url, {
    data,
  });
  return response.data;
};

const useDisbandGroupConversation = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const [, setActiveConversationId] = useGlobalState("activeConversationId");
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ groupConversationId }: Props) =>
      disbandGroupConversation({
        groupConversationId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
      setActiveConversationId("");
    },
    onError: (err) => {
      console.error("Failed to disband group: " + err.message);
    },
  });
  return mutation;
};

export { useDisbandGroupConversation };
