import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosProps, Interaction } from "@/models";
import { useAxios } from "hooks/useAxios";

interface Props {
  postId: string;
  isCurrentUser: boolean;
}

interface FetchProps extends Props, AxiosProps {}

const getInteractionByPostId = async ({
  postId,
  isCurrentUser,
  axiosInstance,
}: FetchProps): Promise<Interaction[]> => {
  const url = `/api/post/interact${isCurrentUser && "/user"}`;
  const response = await axiosInstance.get(url, {
    params: {
      id: postId,
    },
  });
  return response.data;
};

const useGetInteractionByPostId = (
  { postId, isCurrentUser }: Props,
  queryOptions: Omit<
    UseQueryOptions<
      Interaction[] | null,
      unknown,
      Interaction[] | null,
      QueryKey
    >,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["interactionList", postId],
    queryFn: () =>
      getInteractionByPostId({
        postId,
        isCurrentUser,
        axiosInstance: protectedAxiosInstance,
      }),
  });
};

export { useGetInteractionByPostId };
