import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupInvitation } from "@/models";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";

interface Props {
  groupId: string;
}

interface FetchProps extends Props, AxiosProps {}

const generateGroupInvitation = async ({
  groupId,
  axiosInstance,
}: FetchProps): Promise<GroupInvitation | null> => {
  const url = `/api/conversation/group/invite`;
  const data = {
    groupId,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useGenerateGroupInvitation = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useMutation<GroupInvitation | null, Error, Props, unknown>({
    mutationFn: ({ groupId }) =>
      generateGroupInvitation({
        groupId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: (_data, variable, _context) => {
      const { groupId } = variable;
      queryClient.invalidateQueries({
        queryKey: ["group", groupId, "invitation"],
        exact: true,
      });
      toast.success("Tạo mới link nhóm thành công");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Tạo mới link nhóm thất bại");
    },
  });
};

export { useGenerateGroupInvitation };
