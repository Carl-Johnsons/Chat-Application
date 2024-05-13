import { axiosInstance } from "@/utils";
import { Message } from "@/models";
import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface FetchProps {
  conversationId: string;
  skipBatch: number;
}

const getMessageList = async ({
  conversationId,
  skipBatch,
}: FetchProps): Promise<Message[] | null> => {
  const url = `/api/Messages/Conversation/${conversationId}?skip=${skipBatch}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetInfiniteMessageList = (
  conversationId: string,
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: Message[];
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: Message[];
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
      const ml = await getMessageList({
        conversationId,
        skipBatch: pageParam,
      });
      return {
        data: ml ?? [],
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: (prev) => {
      return prev.data.length === 0 ? undefined : prev.nextPage;
    },
    initialData: () => {
      return queryClient.getQueryData<
        InfiniteData<{ data: Message[]; nextPage: number }, number>
      >(["messageList", "conversation", conversationId, "infinite"]);
    },
  });

  return infiniteMessageListQuery;
};

export { useGetInfiniteMessageList };
