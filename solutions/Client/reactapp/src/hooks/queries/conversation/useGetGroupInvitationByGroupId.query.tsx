import { AxiosProps, GroupInvitation } from "@/models";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";

interface Props {
  groupId: string | undefined;
}
interface FetchProp extends Props, AxiosProps {}

const getGroupInvitationByGroupId = async ({
  groupId,
  axiosInstance,
}: FetchProp): Promise<GroupInvitation | null> => {
  if (!groupId) {
    return null;
  }
  const url = `/api/conversation/group/invite`;
  const params = {
    id: groupId,
  };
  const response = await axiosInstance.get(url, {
    params,
  });

  return response.data;
};

const useGetGroupInvitationByGroupId = (
  { groupId }: Props,
  queryOptions: Omit<
    UseQueryOptions<
      GroupInvitation | null,
      Error,
      GroupInvitation | null,
      unknown[]
    >,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useQuery({
    ...queryOptions,
    queryKey: ["group", groupId, "invitation"],
    queryFn: () =>
      getGroupInvitationByGroupId({
        groupId,
        axiosInstance: protectedAxiosInstance,
      }),
    initialData: () => {
      return queryClient.getQueryData<GroupInvitation | null>([
        "group",
        groupId,
        "invitation",
      ]);
    },
  });
};

export { useGetGroupInvitationByGroupId };
