import { protectedAxiosInstance } from "@/utils";
import { ConversationUser } from "models/ConversationUser";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ConversationResponseDTO } from "@/models/DTOs";

interface FetchPropsByConversationId {
  conversationId: string | undefined;
  other: boolean;
}

interface GetMemberListByConversationIdProps {
  conversationId: string;
  other?: boolean;
}

const getConversationList =
  async (): Promise<ConversationResponseDTO | null> => {
    const url = `/api/conversation/user`;
    const response = await protectedAxiosInstance.get(url);
    console.log(response.data);

    return response.data;
  };
const getMemberListByConversationId = async ({
  conversationId,
  other = false,
}: FetchPropsByConversationId): Promise<ConversationUser[] | null> => {
  const url = `/api/conversation/member`;
  const response = await protectedAxiosInstance.get(url, {
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
  return useQuery({
    ...queryOptions,
    queryKey: ["conversationList"],
    queryFn: getConversationList,
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
  return useQuery({
    ...queryOptions,
    queryKey: ["conversation", "member", conversationId],
    queryFn: () =>
      getMemberListByConversationId({ conversationId: conversationId, other }),
  });
};

export { useGetConversationList, useGetMemberListByConversationId };
