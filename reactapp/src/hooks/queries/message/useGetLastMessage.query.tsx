import { GroupMessage, IndividualMessage, MessageType } from "@/models";
import { axiosInstance } from "@/utils";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useGetCurrentUser } from "../user";

interface GroupProps {
  groupId: number;
}
interface IndividualProps {
  senderId: number;
  receiverId: number;
}
const getLastGroupMessage = async ({
  groupId,
}: GroupProps): Promise<GroupMessage | null> => {
  const url = "/api/Messages/group/GetLastByGroupId/" + groupId;
  const response = await axiosInstance.get(url);
  return response.data;
};
const getLastIndividualMessage = async ({
  senderId,
  receiverId,
}: IndividualProps): Promise<IndividualMessage | null> => {
  const url = `/api/Messages/individual/GetLast/${senderId}/${receiverId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetLastMessage = (entityId: number | undefined, type: MessageType) => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  const lastIMQuery = useQuery({
    queryKey: ["lastMessage", "individual", entityId],
    enabled: !!entityId && !!currentUser,
    queryFn: () =>
      getLastIndividualMessage({
        senderId: currentUser?.userId ?? -1,
        receiverId: entityId ?? -1,
      }),
    initialData: () => {
      return queryClient.getQueryData<IndividualMessage | null>([
        "lastMessage",
        "individual",
        entityId,
      ]);
    },
  });

  const lastGMQuery = useQuery({
    queryKey: ["lastMessage", "group", entityId],
    enabled: !!entityId,
    queryFn: () => getLastGroupMessage({ groupId: entityId ?? -1 }),
    initialData: () => {
      return queryClient.getQueryData<GroupMessage | null>([
        "lastMessage",
        "group",
        entityId,
      ]);
    },
  });
  switch (type) {
    case "Individual":
      return lastIMQuery;
    default:
      return lastGMQuery;
  }
};
const useGetLastGroupMessage = (groupId: number) =>
  useGetLastMessage(groupId, "Group") as UseQueryResult<
    GroupMessage | null,
    Error
  >;
const useGetLastIndividualMessage = (groupId: number) =>
  useGetLastMessage(groupId, "Individual") as UseQueryResult<
    IndividualMessage | null,
    Error
  >;
export { useGetLastGroupMessage, useGetLastIndividualMessage };
