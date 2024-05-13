import { axiosInstance } from "@/utils";
import {
  UseQueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Message } from "@/models";

interface FetchProps {
  conversationId: string | undefined;
}

const getLastMessage = async ({
  conversationId,
}: FetchProps): Promise<Message | null> => {
  if (!conversationId) {
    return null;
  }
  const url = `/api/Messages/Conversation/${conversationId}/last`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetLastMessage = (conversationId: string | undefined) => {
  const queryClient = useQueryClient();
  const lastMessageQuery = useQuery({
    queryKey: ["message", "conversation", conversationId, "last"],
    enabled: !!conversationId,
    queryFn: () =>
      getLastMessage({
        conversationId,
      }),
    initialData: () => {
      return queryClient.getQueryData<Message | null>([
        "message",
        "conversation",
        conversationId,
        "last",
      ]);
    },
  });
  return lastMessageQuery;
};
const useGetLastMessages = (
  conversationIds: string[],
  queryOptions: Omit<
    UseQueryOptions<Message | null, Error, Message | null, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const queries = useQueries({
    queries: conversationIds.map((conversationId) => {
      return {
        ...queryOptions,
        queryKey: ["message", "conversation", conversationId, "last"],
        queryFn: () =>
          getLastMessage({
            conversationId,
          }),
        initialData: () => {
          return queryClient.getQueryData<Message | null>([
            "message",
            "conversation",
            conversationId,
            "last",
          ]);
        },
      };
    }),
  });
  return queries;
};

export { useGetLastMessage, useGetLastMessages };
