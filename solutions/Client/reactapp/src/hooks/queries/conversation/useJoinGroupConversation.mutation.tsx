"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  groupId: string;
  invitationId: string;
}

interface FetchProps extends Props, AxiosProps {}

const joinGroupConversation = async ({
  groupId,
  invitationId,
  axiosInstance,
}: FetchProps): Promise<void | null> => {
  const url = `/api/conversation/group/join`;
  const data = {
    groupId,
    inviteId: invitationId,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useJoinGroupConversation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useMutation<void | null, Error, Props, unknown>({
    mutationFn: ({ groupId, invitationId }) =>
      joinGroupConversation({
        groupId,
        invitationId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
      router.push("/");
      toast.success("Tham gia nhóm thành công");
    },
    onError: (err) => {
      console.error(err.message);
      toast.error("Tham gia nhóm thất bại");
    },
  });
};

export { useJoinGroupConversation };
