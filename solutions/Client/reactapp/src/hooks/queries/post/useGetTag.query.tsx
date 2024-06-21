import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosProps, Tag } from "@/models";
import { useAxios } from "hooks/useAxios";

interface FetchTagProps extends AxiosProps {}

const getTags = async ({ axiosInstance }: FetchTagProps): Promise<Tag[]> => {
  const url = `/api/post/tag`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetTags = (
  queryOptions: Omit<
    UseQueryOptions<Tag[], Error, Tag[], unknown[]>,
    "queryKey" | "queryFn" | "enabled" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["conversationList"],
    queryFn: () => getTags({ axiosInstance: protectedAxiosInstance }),
  });
};

export { useGetTags };
