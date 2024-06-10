import { AxiosProps, Conversation } from "@/models";
import {
  UseQueryOptions,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";

interface Props extends AxiosProps {
  conversationId: string | undefined;
}
const getConversation = async ({
  conversationId,
  axiosInstance,
}: Props): Promise<Conversation | null> => {
  if (!conversationId) {
    return null;
  }
  const url = `/api/conversation`;
  const response = await axiosInstance.get(url, {
    params: {
      conversationId: conversationId,
    },
  });
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
  const { protectedAxiosInstance } = useAxios();
  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", conversationId],
    queryFn: () =>
      getConversation({
        conversationId,
        axiosInstance: protectedAxiosInstance,
      }),
    initialData: () => {
      return queryClient.getQueryData<Conversation | null>([
        "conversation",
        conversationId,
      ]);
    },
  });
};
const useGetConversations = (
  conversationsId: string[],
  queryOptions: Omit<
    UseQueryOptions<Conversation | null, Error, Conversation | null, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useQueries({
    queries: conversationsId.map((conversationId) => {
      return {
        ...queryOptions,
        queryKey: ["conversation", conversationId],
        queryFn: () =>
          getConversation({
            conversationId,
            axiosInstance: protectedAxiosInstance,
          }),
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
