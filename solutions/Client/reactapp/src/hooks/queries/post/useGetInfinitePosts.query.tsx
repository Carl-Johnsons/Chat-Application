import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps } from "@/models";
import { PaginatedPostListResponse } from "models/DTOs";
import { useAxios } from "hooks/useAxios";

interface FetchProps extends AxiosProps {
  skipBatch: number;
}

const getPostList = async ({
  skipBatch,
  axiosInstance,
}: FetchProps): Promise<PaginatedPostListResponse> => {
  const url = `api/post/all`;
  const response = await axiosInstance.get(url, {
    params: {
      skip: skipBatch,
    },
  });
  return response.data;
};

const useGetInfinitePost = (
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: PaginatedPostListResponse;
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: PaginatedPostListResponse;
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
  const infinitePostListQuery = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["postList", "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getPostList({
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
          { data: PaginatedPostListResponse; nextPage: number },
          number
        >
      >(["postList", "infinite"]);
    },
  });

  return infinitePostListQuery;
};

export { useGetInfinitePost };
