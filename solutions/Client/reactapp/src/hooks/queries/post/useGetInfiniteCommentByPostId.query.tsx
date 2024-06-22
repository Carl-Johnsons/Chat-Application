import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps } from "@/models";
import { PaginatedCommentListResponse } from "models/DTOs";
import { useAxios } from "hooks/useAxios";

interface Props {
  postId: string;
}

interface FetchProps extends AxiosProps {
  postId: string;
  skipBatch: number;
}

const getCommentsByPostId = async ({
  postId,
  skipBatch,
  axiosInstance,
}: FetchProps): Promise<PaginatedCommentListResponse> => {
  const url = `api/post/comment`;
  const response = await axiosInstance.get(url, {
    params: {
      postId,
      skip: skipBatch,
    },
  });
  return response.data;
};

const useGetInfiniteCommentByPostId = (
  { postId }: Props,
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: PaginatedCommentListResponse;
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: PaginatedCommentListResponse;
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
  const infiniteCommentListQuery = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["commentList", "postId", postId, "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getCommentsByPostId({
        postId,
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
          { data: PaginatedCommentListResponse; nextPage: number },
          number
        >
      >(["commentList", "postId", postId, "infinite"]);
    },
  });

  return infiniteCommentListQuery;
};

export { useGetInfiniteCommentByPostId };
