import { ConversationUser } from "models/ConversationUser";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ConversationResponseDTO } from "@/models/DTOs";
import { AxiosProps } from "@/models";
import { useAxios } from "hooks/useAxios";

interface FetchConversationListProps extends AxiosProps {}

interface FetchPropsByConversationId extends AxiosProps {
  conversationId: string | undefined;
  other: boolean;
}

interface GetMemberListByConversationIdProps {
  conversationId: string;
  other?: boolean;
}

const getConversationList = async ({
  axiosInstance,
}: FetchConversationListProps): Promise<ConversationResponseDTO | null> => {
  const url = `/api/conversation/user`;
  const response = await axiosInstance.get(url);
  console.log(response.data);

  return response.data;
};
const getMemberListByConversationId = async ({
  conversationId,
  other = false,
  axiosInstance,
}: FetchPropsByConversationId): Promise<ConversationUser[] | null> => {
  const url = `/api/conversation/member`;
  const response = await axiosInstance.get(url, {
    params: {
      conversationId: conversationId,
      other: other,
    },
  });
  return response.data;
};

const useGetConversationList = (
  queryOptions: Omit<
    UseQueryOptions<
      ConversationResponseDTO | null,
      Error,
      ConversationResponseDTO | null,
      unknown[]
    >,
    "queryKey" | "queryFn" | "enabled" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["conversationList"],
    queryFn: () =>
      getConversationList({ axiosInstance: protectedAxiosInstance }),
  });
};

const useGetMemberListByConversationId = (
  { conversationId, other = false }: GetMemberListByConversationIdProps,
  queryOptions: Omit<
    UseQueryOptions<
      ConversationUser[] | null,
      Error,
      ConversationUser[] | null,
      unknown[]
    >,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", "member", conversationId],
    queryFn: () =>
      getMemberListByConversationId({
        conversationId: conversationId,
        other,
        axiosInstance: protectedAxiosInstance,
      }),
  });
};

export { useGetConversationList, useGetMemberListByConversationId };
