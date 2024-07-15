import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";

interface Props {
  postId: string;
  content?: string;
  tagIds: string[];
  active: boolean;
}

interface FetchProps extends Props, AxiosProps {}

const updatePost = async ({
  postId,
  content,
  active,
  tagIds,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post";
  const data = {
    id: postId,
    content,
    active,
    tagIds,
  };
  const response = await axiosInstance.put(url, data);
  return response.data;
};

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId, content, active, tagIds }: Props) =>
      updatePost({
        postId,
        content,
        active,
        tagIds,
        axiosInstance: protectedAxiosInstance,
      }),
    onMutate: (context: Props) => {
      return context;
    },
    onSuccess: (_data, _variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ["post", _context.postId],
        exact: true,
      });
      toast.success("Cập nhật bài đăng thành công");
    },
    onError: (err) => {
      console.error("Failed to update post: " + err.message);
      toast.error("Cập nhật bài đăng thất bại");
    },
  });
  return mutation;
};

export { useUpdatePost };
