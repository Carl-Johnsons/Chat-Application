import { AxiosProps, GroupInvitation } from "@/models";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";

interface Props {
  invitationId: string | undefined;
}
interface FetchProp extends Props, AxiosProps {}

const getGroupInvitationByInviteId = async ({
  invitationId,
  axiosInstance,
}: FetchProp): Promise<GroupInvitation | null> => {
  if (!invitationId) {
    return null;
  }
  const url = `/api/conversation/group/invite/detail`;
  const params = {
    id: invitationId,
  };
  const response = await axiosInstance.get(url, {
    params,
  });

  return response.data;
};

const useGetGroupInvitationByInviteId = (
  { invitationId }: Props,
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
    queryKey: ["group", "invitation", invitationId],
    queryFn: () =>
      getGroupInvitationByInviteId({
        invitationId,
        axiosInstance: protectedAxiosInstance,
      }),
    initialData: () => {
      return queryClient.getQueryData<GroupInvitation | null>([
        "group",
        "invitation",
        invitationId,
      ]);
    },
  });
};

export { useGetGroupInvitationByInviteId };
