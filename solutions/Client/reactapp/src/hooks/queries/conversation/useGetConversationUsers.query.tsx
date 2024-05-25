import { protectedAxiosInstance } from "@/utils";
import { ConversationUser } from "models/ConversationUser";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Conversation } from "@/models";

interface FetchPropsByConversationId {
  conversationId: string | undefined;
}

const getConversationList = async (): Promise<Conversation[] | null> => {
  const url = `/api/conversation/user`;
  const response = await protectedAxiosInstance.get(url);
  console.log(response.data);

  return response.data;
};
const getMemberListByConversationId = async ({
  conversationId,
}: FetchPropsByConversationId): Promise<ConversationUser[] | null> => {
  const url = `/api/conversation/member`;
  const response = await protectedAxiosInstance.get(url, {
    params: {
      conversationId: conversationId,
    },
  });
  return response.data;
};

const useGetConversationList = (
  queryOptions: Omit<
    UseQueryOptions<
      Conversation[] | null,
      Error,
      Conversation[] | null,
      unknown[]
    >,
    "queryKey" | "queryFn" | "enabled" | "initialData"
  > = {}
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ["conversationList"],
    queryFn: getConversationList,
  });
};

const useGetMemberListByConversationId = (
  conversationId: string,
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
  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", "member", conversationId],
    queryFn: () =>
      getMemberListByConversationId({ conversationId: conversationId }),
  });
};

export { useGetConversationList, useGetMemberListByConversationId };
