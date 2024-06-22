import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps, Message } from "@/models";
import { PaginatedMessageListResponse } from "models/DTOs";
import { useAxios } from "hooks/useAxios";

interface FetchProps extends AxiosProps {
  conversationId: string;
  skipBatch: number;
}

const getMessageList = async ({
  conversationId,
  skipBatch,
  axiosInstance,
}: FetchProps): Promise<PaginatedMessageListResponse> => {
  const url = `api/conversation/message`;
  const response = await axiosInstance.get(url, {
    params: {
      conversationId,
      skip: skipBatch,
    },
  });
  return response.data;
};

const useGetInfiniteMessageList = (
  conversationId: string,
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: PaginatedMessageListResponse;
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: PaginatedMessageListResponse;
        nextPage: number;
      }>,
      unknown[],
      number
    >,
    | "queryKey"
    | "queryFn"
    | "initialPageParam"
    | "getNextPageParam"
    | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const infiniteMessageListQuery = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["messageList", "conversation", conversationId, "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getMessageList({
        conversationId,
        skipBatch: pageParam,
        axiosInstance: protectedAxiosInstance,
      });
      return {
        data: pml,
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: (prev) => {
      return prev.data.paginatedData.length === 0 ? undefined : prev.nextPage;
    },
    initialData: () => {
      return queryClient.getQueryData<
        InfiniteData<
          { data: PaginatedMessageListResponse; nextPage: number },
          number
        >
      >(["messageList", "conversation", conversationId, "infinite"]);
    },
  });

  return infiniteMessageListQuery;
};

const useGetLastMessages = (
  conversationIds: string[],
  queryOptions: Omit<
    UseQueryOptions<Message | undefined, Error, Message | undefined, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const queries = useQueries({
    queries: conversationIds.map((conversationId) => {
      return {
        ...queryOptions,
        queryKey: ["message", "conversation", conversationId, "last"],
        queryFn: async () => {
          const response = await getMessageList({
            conversationId,
            skipBatch: 0,
            axiosInstance: protectedAxiosInstance,
          });
          return response.metadata.lastMessage;
        },
        initialData: () => {
          return queryClient.getQueryData<Message | undefined>([
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

export { useGetInfiniteMessageList, useGetLastMessages };
