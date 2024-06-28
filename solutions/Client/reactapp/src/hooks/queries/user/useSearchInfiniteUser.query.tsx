import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { PaginatedUserListResponse } from "@/models/DTOs";
import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface Props {
  searchValue: string;
  limit?: number;
}
interface FetchProps extends Props, AxiosProps {
  skipBatch: number;
}

const searchUser = async ({
  searchValue,
  axiosInstance,
  skipBatch,
  limit,
}: FetchProps): Promise<PaginatedUserListResponse> => {
  const params = {
    value: searchValue,
    skip: skipBatch,
    limit: limit,
  };
  const url = "http://localhost:5001/api/users/search";
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const useSearchInfiniteUser = (
  { searchValue, limit }: Props,
  queryOptions: Omit<
    UndefinedInitialDataInfiniteOptions<
      {
        data: PaginatedUserListResponse;
        nextPage: number;
      },
      Error,
      InfiniteData<{
        data: PaginatedUserListResponse;
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

  const infiniteUserListQuery = useInfiniteQuery({
    ...queryOptions,
    queryKey: ["userList", "search", searchValue, "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await searchUser({
        searchValue,
        skipBatch: pageParam,
        limit: limit,
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
          {
            data: PaginatedUserListResponse;
            nextPage: number;
          },
          number
        >
      >(["userList", "search", searchValue, "infinite"]);
    },
  });

  return infiniteUserListQuery;
};

export { useSearchInfiniteUser };
