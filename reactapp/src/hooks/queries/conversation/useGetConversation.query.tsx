import { Conversation } from "@/models";
import { axiosInstance } from "@/utils";
import {
  UseQueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface Props {
  conversationId: number | undefined;
}
const getConversation = async ({
  conversationId,
}: Props): Promise<Conversation | null> => {
  if (!conversationId) {
    return null;
  }
  const url = `/api/Conversation/${conversationId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetConversation = (
  { conversationId }: Props,
  queryOptions: Omit<
    UseQueryOptions<Conversation | null, Error, Conversation | null, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversation({ conversationId }),
    initialData: () => {
      return queryClient.getQueryData<Conversation | null>([
        "conversation",
        conversationId,
      ]);
    },
  });
};
const useGetConversations = (
  conversationsId: number[],
  queryOptions: Omit<
    UseQueryOptions<Conversation | null, Error, Conversation | null, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  return useQueries({
    queries: conversationsId.map((conversationId) => {
      return {
        ...queryOptions,
        queryKey: ["conversation", conversationId],
        queryFn: () => getConversation({ conversationId }),
        initialData: () => {
          return queryClient.getQueryData<Conversation | null>([
            "conversation",
            conversationId,
          ]);
        },
      };
    }),
  });
};
export { useGetConversation, useGetConversations };
