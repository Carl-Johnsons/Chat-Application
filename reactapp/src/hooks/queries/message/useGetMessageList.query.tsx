import { GroupMessage, IndividualMessage, MessageType } from "@/models";
import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from "../user";

/**
 * @param {number} groupId
 * @returns
 */
const getGroupMessageList = async (
  groupId: number
): Promise<GroupMessage[] | null> => {
  const url = "/api/Messages/group/" + groupId;
  const response = await axiosInstance.get(url);
  return response.data;
};

/**
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
const getIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<IndividualMessage[] | null> => {
  const url = `/api/Messages/individual/${senderId}/${receiverId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetMessageList = (
  entityId: number,
  type: MessageType,
  enabled: boolean = true
) => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["messageList", type.toLowerCase(), entityId],
    enabled: !!currentUser && enabled,
    queryFn: () => {
      return new Promise<GroupMessage[] | IndividualMessage[] | null>(
        (resolve) => {
          if (type === "Group") {
            resolve(getGroupMessageList(entityId));
          }
          if (type === "Individual") {
            resolve(
              getIndividualMessageList(currentUser?.userId ?? -1, entityId)
            );
          }
        }
      );
    },
    initialData: () => {
      return queryClient.getQueryData<
        GroupMessage[] | IndividualMessage[] | null
      >(["messageList", type.toLowerCase(), entityId]);
    },
  });
};

export { useGetMessageList };
