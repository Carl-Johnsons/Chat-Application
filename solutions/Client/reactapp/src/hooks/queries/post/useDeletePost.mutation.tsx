import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

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
    },
    onError: (err) => {
      console.error("Failed to delete post: " + err.message);
    },
  });
  return mutation;
};

export { useDeletePost };
