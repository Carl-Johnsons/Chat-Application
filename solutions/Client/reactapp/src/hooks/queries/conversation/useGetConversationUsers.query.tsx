import { axiosInstance } from "@/utils";
import { ConversationUser } from "models/ConversationUser";
import { useGetCurrentUser } from "../user";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

interface FetchPropsByUserId {
  userId: string | undefined;
}
interface FetchPropsByConversationId {
  conversationId: string | undefined;
}

const getConversationUserByUserId = async ({
  userId,
}: FetchPropsByUserId): Promise<ConversationUser[] | null> => {
  if (!userId) {
    return null;
  }
  const url = `/api/Conversation/User/${userId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
const getConversationUserByConversationId = async ({
  conversationId,
}: FetchPropsByConversationId): Promise<ConversationUser[] | null> => {
  if (!conversationId) {
    return null;
  }
  const url = `/api/Conversation/member/${conversationId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetConversationUsers = (
  queryOptions: Omit<
    UseQueryOptions<
      ConversationUser[] | null,
      Error,
      ConversationUser[] | null,
      unknown[]
    >,
    "queryKey" | "queryFn" | "enabled" | "initialData"
  > = {}
) => {
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    ...queryOptions,
    queryKey: ["conversationList"],
    enabled: !!currentUser,
    queryFn: () => getConversationUserByUserId({ userId: currentUser?.id }),
  });
};

const useGetConversationUsersByConversationId = (
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
      getConversationUserByConversationId({ conversationId: conversationId }),
  });
};

export { useGetConversationUsers, useGetConversationUsersByConversationId };
