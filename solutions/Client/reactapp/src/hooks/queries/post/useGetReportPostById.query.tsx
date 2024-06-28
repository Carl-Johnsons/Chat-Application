import {
  QueryKey,
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps, PostReport } from "@/models";
import { useAxios } from "hooks/useAxios";

interface Props {
  postId: string;
}
interface FetchProps extends Props, AxiosProps {}

const getReportPostById = async ({
  postId,
  axiosInstance,
}: FetchProps): Promise<PostReport[]> => {
  const url = `/api/post/report`;
  const response = await axiosInstance.get(url, {
    params: {
      id: postId,
    },
  });
  return response.data;
};

const useGetReportPostById = (
  { postId }: Props,
  queryOptions: Omit<
    UseQueryOptions<PostReport[], Error, PostReport[], QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["reportPost", postId],
    queryFn: () =>
      getReportPostById({ postId, axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      const data = queryClient.getQueryData<PostReport[]>([
        "reportPost",
        postId,
      ]);
      return data;
    },
  });
};

export { useGetReportPostById };
