import { axiosInstance } from "@/utils";
import { GroupMessage, IndividualMessage, MessageType } from "@/models";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useGetCurrentUser } from "../user";

interface GroupProps {
  groupId: number;
  skipBatch: number;
}
interface IndividualProps {
  senderId: number;
  receiverId: number;
  skipBatch: number;
}

interface Props {
  entityId: number;
  type: MessageType;
  enabled?: boolean;
}

const getNextGroupMessageList = async ({
  groupId,
  skipBatch,
}: GroupProps): Promise<GroupMessage[] | null> => {
  const url = `/api/Messages/group/${groupId}/skip/${skipBatch}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const getNextIndividualMessageList = async ({
  senderId,
  receiverId,
  skipBatch,
}: IndividualProps): Promise<IndividualMessage[] | null> => {
  const url = `/api/Messages/individual/${senderId}/${receiverId}/skip/${skipBatch}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetInfiniteMessageList = ({
  entityId,
  type,
  enabled = true,
}: Props) => {
  const { data: currentUser } = useGetCurrentUser();

  const infiniteIMListQuery = useInfiniteQuery({
    queryKey: ["messageList", "individual", entityId, "infinite"],
    enabled: !!currentUser && enabled,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const imList = await getNextIndividualMessageList({
        senderId: currentUser?.userId ?? -1,
        receiverId: entityId,
        skipBatch: pageParam,
      });
      return {
        data: imList ?? [],
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: (prev) => {
      return prev.data.length === 0 ? undefined : prev.nextPage;
    },
  });

  const infiniteGMListQuery = useInfiniteQuery({
    queryKey: ["messageList", "group", entityId, "infinite"],
    enabled: enabled,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const gmList = await getNextGroupMessageList({
        groupId: entityId,
        skipBatch: pageParam,
      });
      return {
        data: gmList ?? [],
        nextPage: pageParam + 1,
      };
    },
    getNextPageParam: (prev) => {
      return prev.data.length === 0 ? undefined : prev.nextPage;
    },
  });

  switch (type) {
    case "Individual":
      return infiniteIMListQuery;
    default:
      return infiniteGMListQuery;
  }
};

const useGetInfiniteIMList = (entityId: number, enabled?: boolean) =>
  useGetInfiniteMessageList({
    entityId,
    type: "Individual",
    enabled,
  }) as UseInfiniteQueryResult<
    InfiniteData<
      {
        data: IndividualMessage[];
        nextPage: number;
      },
      unknown
    >,
    Error
  >;

const useGetInfiniteGMList = (entityId: number, enabled?: boolean) =>
  useGetInfiniteMessageList({
    entityId,
    type: "Group",
    enabled,
  }) as UseInfiniteQueryResult<
    InfiniteData<
      {
        data: GroupMessage[];
        nextPage: number;
      },
      unknown
    >,
    Error
  >;

export { useGetInfiniteIMList, useGetInfiniteGMList };
