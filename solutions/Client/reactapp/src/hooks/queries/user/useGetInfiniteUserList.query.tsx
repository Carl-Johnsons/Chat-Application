import {
  InfiniteData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps } from "@/models";
import { PaginatedUserListResponse } from "@/models/DTOs";
import { useAxios } from "@/hooks";
import { IDENTITY_SERVER_URL } from "@/constants/url.constant";

interface Props {
  skipBatch: number;
}

interface FetchProps extends Props, AxiosProps {}

const getUserList = async ({
  skipBatch,
  axiosInstance,
}: FetchProps): Promise<PaginatedUserListResponse> => {
  const url = `${IDENTITY_SERVER_URL}/api/users/all`;
  const response = await axiosInstance.get(url, {
    params: {
      skip: skipBatch,
    },
  });
  return response.data;
};

const useGetInfiniteUserList = (
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
    queryKey: ["userList", "infinite"],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const pml = await getUserList({
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
          { data: PaginatedUserListResponse; nextPage: number },
          number
        >
      >(["userList", "infinite"]);
    },
  });

  return infiniteUserListQuery;
};

export { useGetInfiniteUserList };
