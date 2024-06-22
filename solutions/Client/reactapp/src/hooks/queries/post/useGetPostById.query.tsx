import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosProps, Post } from "@/models";
import { useAxios } from "hooks/useAxios";

interface Props {
  postId: string;
}
interface FetchProps extends Props, AxiosProps {}

const getPostByd = async ({
  postId,
  axiosInstance,
}: FetchProps): Promise<Post> => {
  const url = `/api/post`;
  const response = await axiosInstance.get(url, {
    params: {
      id: postId,
    },
  });
  return response.data;
};

const useGetPostByd = (
  { postId }: Props,
  queryOptions: Omit<
    UseQueryOptions<Post | null, Error, Post | null, QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["post", postId],
    queryFn: () =>
      getPostByd({ postId, axiosInstance: protectedAxiosInstance }),
  });
};

export { useGetPostByd };
