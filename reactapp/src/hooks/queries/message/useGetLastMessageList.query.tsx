import { GroupMessage, IndividualMessage } from "@/models";
import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useGetCurrentUser } from "../user";

/**
 * @param {number} userId
 * @returns
 */
const getLastMessageList = async (
  userId: number
): Promise<IndividualMessage[] | GroupMessage[] | null> => {
  const url = `/api/Messages/GetLast/${userId}`;
  const response: AxiosResponse<IndividualMessage[] | GroupMessage[]> =
    await axiosInstance.get(url);
  return response.data;
};

const useGetLastMessageList = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["lastMessageList"],
    enabled: !!currentUser,
    queryFn: () => getLastMessageList(currentUser?.userId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<
        IndividualMessage[] | GroupMessage[] | null
      >(["lastMessageList"]);
    },
  });
};

export { useGetLastMessageList };
