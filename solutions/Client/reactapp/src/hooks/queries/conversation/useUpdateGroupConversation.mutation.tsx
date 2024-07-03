"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";

interface Props {
  id: string;
  membersId?: string[];
  name?: string;
  imageFile?: Blob;
}

interface FetchProps extends Props, AxiosProps {}

const updateGroupConversation = async ({
  id,
  membersId,
  name,
  imageFile,
  axiosInstance,
}: FetchProps): Promise<void | null> => {
  const url = `/api/conversation/group`;
  const formData = new FormData();
  formData.append("id", id);
  if (name) formData.append("name", name);
  (membersId ?? []).forEach((mId) => {
    formData.append("membersId", mId);
  });
  if (imageFile) formData.append("imageFile", imageFile);

  const response = await axiosInstance.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useUpdateGroupConversation = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useMutation<void | null, Error, Props, unknown>({
    mutationFn: ({ id, membersId, imageFile, name }) =>
      toast.promise(
        updateGroupConversation({
          id,
          membersId,
          name,
          imageFile,
          axiosInstance: protectedAxiosInstance,
        }),
        {
          pending: "Đang cật nhật",
          success: "Cập nhật nhóm thành công",
          error: "Cập nhật nhóm thất bại",
        }
      ),
    onSuccess: (_data, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", "member", variable.id],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation", variable.id],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
};

export { useUpdateGroupConversation };
