import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

interface FetchProps extends Props, AxiosProps {}

const deletePost = async ({ id, axiosInstance }: FetchProps): Promise<void> => {
  const url = "/api/post";
  const data = {
    id,
  };
  const response = await axiosInstance.delete(url, {
    data,
  });
  return response.data;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, unknown>({
    mutationFn: ({ id }: Props) =>
      deletePost({
        id,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["reportPosts", "infinite"],
        exact: true,
      });
      toast.success("Xóa bài đăng thành công");
    },
    onError: (err) => {
      console.error("Failed to delete post: " + err.message);
      toast.error("Xóa bài đăng thất bại");
    },
  });
  return mutation;
};

export { useDeletePost };
