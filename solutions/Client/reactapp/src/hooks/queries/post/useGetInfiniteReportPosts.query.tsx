import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps } from "@/models";
import { PaginatedReportPostListResponse } from "@/models/DTOs";
import { useAxios } from "@/hooks";

interface Props {
  skipBatch?: number;
  limit?: number;
}

interface FetchProps extends Props, AxiosProps {}

const getReportPostList = async ({
  skipBatch,
  limit,
  axiosInstance,
}: FetchProps): Promise<PaginatedReportPostListResponse> => {
  const url = `api/post/report/all`;
  const params = {
    skip: skipBatch,
    limit: limit,
  };
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const useGetInfiniteReportPosts = (
  { limit }: Props,
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: PaginatedReportPostListResponse;
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: PaginatedReportPostListResponse;
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
  const query = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["reportPosts", "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getReportPostList({
        skipBatch: pageParam,
        limit,
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
          { data: PaginatedReportPostListResponse; nextPage: number },
          number
        >
      >(["reportPosts", "infinite"]);
    },
  });

  return query;
};

export { useGetInfiniteReportPosts };
