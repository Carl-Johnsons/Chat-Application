import { protectedAxiosInstance } from "@/utils";
import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginatedMessageListResponse } from "models/DTOs";

interface FetchProps {
  conversationId: string;
  skipBatch: number;
}

const getMessageList = async ({
  conversationId,
  skipBatch,
}: FetchProps): Promise<PaginatedMessageListResponse> => {
  const url = `api/conversation/message`;
  const response = await protectedAxiosInstance.get(url, {
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

  const infiniteMessageListQuery = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["messageList", "conversation", conversationId, "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getMessageList({
        conversationId,
        skipBatch: pageParam,
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

export { useGetInfiniteMessageList };
