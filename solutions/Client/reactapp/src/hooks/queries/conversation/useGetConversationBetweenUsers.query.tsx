import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosProps, Conversation } from "@/models";
import { useAxios } from "hooks/useAxios";

interface Props {
  otherUserId: string;
}
interface FetchProps extends Props, AxiosProps {}

const getConversationBetweenUser = async ({
  otherUserId,
  axiosInstance,
}: FetchProps): Promise<Conversation | null> => {
  const params = {
    otherUserId,
  };
  const url = `/api/conversation/user/id`;
  const response = await axiosInstance.get(url, {
    params,
  });
  return response.data;
};

const useGetConversationBetweenUser = (
  { otherUserId }: Props,
  queryOptions: Omit<
    UseQueryOptions<Conversation | null, Error, Conversation | null, unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", "user", "other", otherUserId],
    queryFn: () =>
      getConversationBetweenUser({
        otherUserId,
        axiosInstance: protectedAxiosInstance,
      }),
    initialData: () => {
      const data = queryClient.getQueryData<Conversation | null>([
        "conversation",
        "user",
        "other",
        otherUserId,
      ]);
      return data;
    },
  });
};

export { useGetConversationBetweenUser };
